import { useRef, useState, useEffect, Fragment } from "react";
import QuestionContainer from "../helperFiles/questionContainer";
import InputWithIcon from "../helperFiles/customInputTags/inputWithIcon";
import ErrorPrint from "../helperFiles/errorPrint";
import addQuestion from "../helperFiles/addQuestion";
import Axios from "axios";

const getFormattedOutput = (questions, myEmail) => {
  const prefix = "question";
  const getArray = (index, innerIndex) => {
    return questions[prefix + index][innerIndex];
  };
  return {
    project_name: getArray(0, 0).answer,
    industry: getArray(1, 0).answer,
    project_budget: getArray(2, 0).answer,
    budget_currency: getArray(2, 1).answer,
    project_stacks: getArray(3, 2).answer,
    PM_fullName: getArray(4, 0).answer?.otherInfo[0],
    Agree_terms: true,
    project_size: getArray(5, 0).answer,
    project_details: getArray(3, 0).answer,
    webiste: getArray(3, 1).answer,
    project_tags: getArray(1, 1).answer,
    PM_email: getArray(4, 0).answer?.otherInfo[1],
    contact_email:
      questions[prefix + 7].length === 2 ? getArray(7, 1).answer : myEmail,

    launch_date: getArray(6, 0).answer,
    pay_option: getArray(8, 0).answer.paymentMethod,
  };
};

// AXIOS INSTANCE
const axios = Axios.create({
  baseURL: "https://koinstreet-learn-api.herokuapp.com/api/v1/service",
});

const defaultChecked = 0;
class dependency {
  constructor(
    label,
    placeholder,
    ref,
    type,
    validationFxn,
    onInput = () => {},
    correctLength
  ) {
    this.label = label;
    this.placeholder = placeholder;
    this.ref = ref;
    this.type = type;
    this.validationFxn = validationFxn;
    this.onInput = onInput;
    this.maxLength = this.placeholder.length;
    this.correctLength = correctLength;
  }
}

class Radio {
  constructor(label, id, dependencies = []) {
    this.label = label;
    this.id = "page10" + id;
    this.dependencies = dependencies;
  }
}
function try_catch(fxn, invalid) {
  try {
    return fxn();
  } catch (e) {
    return invalid;
  }
}
function basic_text_validation(value) {
  const invalid = "Text input is required";
  return try_catch(() => {
    if (value && typeof value === "string" && value.length >= 0) {
      return "";
    } else {
      return invalid;
    }
  }, invalid);
}
function basic_number_validation(value, correctLength) {
  const invalid = "Incorrect entry";
  return try_catch(() => {
    let valid_arr = value.match(/[0-9]/g);
    console.log(valid_arr, correctLength);
    if (valid_arr) {
      return valid_arr.length === correctLength ? "" : invalid;
    }
    return invalid;
  }, invalid);
}
function basic_date_validation() {
  return "";
}

function createEntry(e) {
  var value = e.target.value;
  var cursor = e.target.selectionStart;
  var matches = value.substring(0, cursor).match(/[^0-9]/g);
  if (matches) cursor -= matches.length;
  value = value.replace(/[^0-9]/g, "").substring(0, 16);
  var formatted = "";
  for (var i = 0, n = value.length; i < n; i++) {
    if (i && i % 4 == 0) {
      if (formatted.length <= cursor) cursor += 2;
      formatted += "  ";
    }
    formatted += value[i];
  }
  if (formatted == e.target.value) return;
  e.target.value = formatted;
  e.target.selectionEnd = cursor;
}
function createDateEntry(e) {
  var value = e.target.value;
  var cursor = e.target.selectionStart;
  var matches = value.substring(0, cursor).match(/[^0-9]/g);
  if (matches) cursor -= matches.length;
  value = value.replace(/[^0-9]/g, "").substring(0, 6);
  var formatted = "";
  for (var i = 0, n = value.length; i < n; i++) {
    if (i == 2) {
      if (formatted.length <= cursor) cursor += 1;
      formatted += "/";
    }
    formatted += value[i];
  }
  if (formatted == e.target.value) return;
  e.target.value = formatted;
  e.target.selectionEnd = cursor;
}
function Page10({ step, setstep, questions, setQuestions, data }) {
  const card_full_name = useRef();
  const card_number = useRef();
  const card_expiry_date = useRef();
  const card_security_code = useRef();
  const agreement = useRef();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [errors, setErrors] = useState({
    agreement: [undefined],
    inputs: [],
  });
  const [serverError, setServerError] = useState([]);
  const [checked, setChecked] = useState(defaultChecked);
  let a = 40.0;
  let b = 10.0;
  let c = a + b;

  const allRadios = [
    new Radio(
      [
        "Credit Card/Debit Card",
        <div className="contain-label-second-part">
          <img src="/assets/images/icons/kissclipart-mastercard-logo-png-clipart-mastercard-credit-card-4497856f6840bcae 1.png" />
          <img src="/assets/images/icons/pngwing 1.png" />
          and more...
        </div>,
      ],
      "card",
      [
        new dependency(
          "* Card Owner",
          "Full Name",
          card_full_name,
          "text",
          basic_text_validation
        ),
        new dependency(
          "* Card Number",
          "****  ****  ****  ****",
          card_number,
          "tel",
          basic_number_validation,
          createEntry,
          16
        ),
        new dependency(
          "* Card Expiry Date",
          "mm/yyyy",
          card_expiry_date,
          "tel",
          basic_number_validation,
          createDateEntry,
          6
        ),
        new dependency(
          "* Card Security Code (CVV2)",
          "***",
          card_security_code,
          "tel",
          basic_number_validation,
          createEntry,
          3
        ),
      ]
    ),
    new Radio(
      [
        "Pay Pal",
        <div className="contain-label-second-part">
          <img src="/assets/images/icons/pngaaa 1.png" />
        </div>,
      ],
      "paypal"
    ),
    new Radio(["Pay in $Minority"], "minority"),
    new Radio(["Electronic Check"], "electronic-check"),
  ];

  useEffect(() => {
    if (shouldSubmit) {
      console.log(window.localStorage.getItem("jwtToken"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      };

      axios
        .post("/", getFormattedOutput(questions, data.email), config)
        .then(() => {
          setstep((prev) => prev + 1);
        })
        .catch((e) => {
          setShouldSubmit(false);
          let feedback = e.response.data.data
            ? e.response.data.data.message
            : e.response.data.message;
          feedback =
            typeof feedback === "string" ? [feedback] : Object.values(feedback);
          setServerError(feedback);
        });
    }
  }, [shouldSubmit]);
  useEffect(() => {
    setErrors((prev) => {
      const prevObj = { ...prev };
      prevObj.inputs = [
        ...allRadios[checked].dependencies.map(() => {
          return [undefined];
        }),
      ];
      return prevObj;
    });
  }, [checked]);
  function addToQuestion(paymentInfo) {
    addQuestion(setQuestions, step, [
      {
        question: "Choose your payment method and provide your payment info?",
        answer: {
          paymentMethod: allRadios[checked].label[0],
          paymentInfo,
        },
      },
    ]);
  }

  function validateRegularInputs(validationFxn, index) {
    setErrors((prev) => {
      const prevObj = { ...prev };
      prevObj.inputs[index] = [validationFxn];
      return prevObj;
    });
  }
  function validateAgreement(e) {
    setErrors((prev) => {
      const prevObj = { ...prev };
      prevObj.agreement[0] = agreement.current.checked
        ? ""
        : "This field is required";
      return prevObj;
    });
  }
  function nextPage() {
    let shouldSubmit = true;
    if (errors.agreement[0] !== "") {
      if (errors.agreement[0] === undefined) {
        validateAgreement();
      }

      shouldSubmit = agreement.current.checked;
    }
    let dependency_arr = allRadios[checked].dependencies;
    const paymentInfo = {};
    for (let i = 0; i < dependency_arr.length; i++) {
      if (errors.inputs[i][0] === undefined) {
        let validation = dependency_arr[i].validationFxn(
          dependency_arr[i].ref.current.value
        );
        if (validation !== "") {
          shouldSubmit = false;
        }
        validateRegularInputs(validation, i);
      } else if (errors.inputs[i][0] !== "") {
        shouldSubmit = false;
      } else {
        paymentInfo[dependency_arr[i].label.replaceAll("*", "").trim()] =
          dependency_arr[i].ref.current.value;
      }
    }
    if (shouldSubmit) {
      addToQuestion(paymentInfo);
      setShouldSubmit(true);
    }
  }
  function prevPage() {
    setstep((prev) => prev - 1);
  }
  // let pop = "popup";
  function toggle() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  return (
    <Fragment>
      <QuestionContainer
        left
        right
        step={step}
        plus={nextPage}
        minus={prevPage}
        customPlusText="SUBMIT PROJECT IDEA"
        id="page10"
        marginBottom="1rem"
      >
        <div className="body">
          A MPA project manager will translate you requirements to a PROJECT
          QUOTE (budget, staffing, timeline, with a complete task break down and
          vesting schedule). You would be charged a fee of $40 for this!
          <table>
            <tbody>
              <tr>
                <th>TOTAL</th>
                <td>$ {a}</td>
              </tr>
              <tr>
                <th>TAXES</th>
                <td>$ {b}</td>
              </tr>
              <tr>
                <th>TOTAL</th>
                <th>$ {c}</th>
              </tr>
            </tbody>
          </table>
          <h4 className="payment-header">
            Please select your preferred payment method.
          </h4>
          {serverError.length !== 0 ? (
            <div
              class="alert alert-danger"
              // role="alert"
              style={{
                textAlign: "left",
                fontWeight: "200",
                position: "relative",
              }}
            >
              <ul>
                {serverError.map((error, index) => {
                  return <li key={index}>{error}</li>;
                })}
              </ul>
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setServerError([]);
                }}
              >
                &times;
              </div>
            </div>
          ) : null}
          {allRadios.map((radio, index) => {
            return (
              <div className="contain-options edit-payment-options" key={index}>
                <div className="wrap">
                  {/* checkbox input */}
                  <input
                    type="radio"
                    className="page10-radio"
                    id={radio.id}
                    name="page-selection"
                    defaultChecked={checked === index}
                    onChange={() => {
                      setChecked(index);
                    }}
                  />
                  <div className="inline-block" style={{ width: "100%" }}>
                    {/* create label for the radio */}
                    <label htmlFor={radio.id} className="bold">
                      {radio.label.map((label, index) => {
                        return (
                          <span
                            key={index}
                            style={{
                              width: `${(radio.label.length / 2) * 100}%`,
                            }}
                          >
                            {label}
                          </span>
                        );
                      })}
                    </label>
                    {/* inner hidden text */}
                    {checked === index ? (
                      <div className="grid">
                        {radio.dependencies.map((dependency, index) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              key={index}
                            >
                              <InputWithIcon
                                id={`paymentOption${index}`}
                                inputRef={dependency.ref}
                                onChange={() => {}}
                                defaultValue={""}
                                label={dependency.label}
                                placeholder={dependency.placeholder}
                                iconLink="/assets/images/icons/Group.svg"
                                marginTop
                                color="rgba(0, 0, 0, 0.65)"
                                hideIcon
                                width="100%"
                                maxLength={
                                  dependency.maxLength &&
                                  dependency.type === "tel"
                                    ? dependency.maxLength
                                    : ""
                                }
                                type={dependency.type}
                                onInput={(e) => {
                                  dependency.onInput(e);
                                  if (errors.inputs[index] !== undefined) {
                                    validateRegularInputs(
                                      dependency.validationFxn(
                                        dependency.ref.current.value,
                                        dependency.correctLength
                                      ),
                                      index
                                    );
                                  }
                                }}
                              />
                              {errors.inputs.length > 0 &&
                              errors.inputs[index][0] !== undefined &&
                              errors.inputs[index][0] !== "" ? (
                                <ErrorPrint
                                  errors={errors.inputs[index]}
                                  red
                                  left
                                />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
          <span className="contain-agree">
            <input
              type="checkbox"
              id="agree"
              ref={agreement}
              onChange={(e) => {
                if (errors.agreement[0] !== undefined) {
                  validateAgreement();
                }
              }}
            />
            <label id="agree" onClick={toggle}>
              {/* <a
                href="https://drive.google.com/file/d/1ZvUac-yvEb-OR2KC8mGmIybU7yIDPuCA/view?usp=sharing"
                target="_blank"
              > */}{" "}
              I have read &amp; agree to the terms/warranty
              {/* </a> */}
            </label>
          </span>
          {errors.agreement[0] !== undefined && errors.agreement[0] !== "" ? (
            <ErrorPrint errors={errors.agreement} red left />
          ) : null}
        </div>
        <div className="popup" id="myPopup">
          <div>
            <h1>Terms / Warranty </h1>
            <button onClick={toggle} id="pop-btn">
              X
            </button>
          </div>
          <p id="terms-txt">
            {" "}
            MPA Consultancy Project Quote is for information purposes enclosed
            within the dealings of its entity only. Minority Programmers
            Association does not guarantee the accuracy of or the conclusions
            reached in this project quote in accordance to the execution of the
            project, and are entitled to monitoring and managing any disputes to
            take place. Minority Programmers Association does not make and
            expressly disclaims all representations and warranties, express,
            implied, statutory or otherwise, whatsoever, including, but not
            limited to: (i) warranties of merchantability, fitness for a
            particular purpose, suitability, usage, title or non infringement;
            (ii) that the contents of this white paper are free from error; and
            (iii) that such contents will not infringe third-party rights.
            Minority Programmers Association and its affiliates shall have no
            liability for damages of any kind arising out of the use, reference
            to, or reliance on this white paper or any of the content contained
            herein, even if advised of the possibility of such damages. In no
            event will Minority Programmers Association or its affiliates be
            liable to any person or entity for any damages, losses, liabilities,
            costs or expenses of any kind, whether direct or indirect,
            consequential, compensatory, incidental, actual, exemplary, punitive
            or special for the use of, reference to, or reliance on this white
            paper or any of the content contained herein, including, without
            limitation, any loss of business, revenues, profits, data, use,
            goodwill or other intangible losses.
          </p>
        </div>
      </QuestionContainer>
    </Fragment>
  );
}
export default Page10;
