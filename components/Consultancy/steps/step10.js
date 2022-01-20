import React, {
  useRef, useState, useEffect,
} from 'react';
import Axios from 'axios';
import QuestionContainer from '../helperFiles/questionContainer';
import InputWithIcon from '../helperFiles/customInputTags/inputWithIcon';
import ErrorPrint from '../helperFiles/errorPrint';
import addQuestion from '../helperFiles/addQuestion';
import getFormattedOutput from '../helperFiles/getFormattedOutput';
import Radio from '../helperFiles/Radio';
import Dependency from '../helperFiles/dependency';

// AXIOS INSTANCE
const axios = Axios.create({
  baseURL: `${process.env.BASE_URI}/service`,
});

const defaultChecked = 0;

function try_catch(fxn, invalid) {
  try {
    return fxn();
  } catch (e) {
    return invalid;
  }
}
function basic_text_validation(value) {
  const invalid = 'Text input is required';
  return try_catch(() => {
    if (value && typeof value === 'string' && value.length >= 0) {
      return '';
    }
    return invalid;
  }, invalid);
}
function basic_number_validation(value, correctLength) {
  const invalid = 'Incorrect entry';
  return try_catch(() => {
    const valid_arr = value.match(/[0-9]/g);
    console.log(valid_arr, correctLength);
    if (valid_arr) {
      return valid_arr.length === correctLength ? '' : invalid;
    }
    return invalid;
  }, invalid);
}

function createEntry(e) {
  let { value } = e.target;
  let cursor = e.target.selectionStart;
  const matches = value.substring(0, cursor).match(/[^0-9]/g);
  if (matches) cursor -= matches.length;
  value = value.replace(/[^0-9]/g, '').substring(0, 16);
  let formatted = '';
  for (let i = 0, n = value.length; i < n; i += 1) {
    if (i && i % 4 === 0) {
      if (formatted.length <= cursor) cursor += 2;
      formatted += '  ';
    }
    formatted += value[i];
  }
  if (formatted === e.target.value) return;
  e.target.value = formatted;
  e.target.selectionEnd = cursor;
}
function createDateEntry(e) {
  let { value } = e.target;
  let cursor = e.target.selectionStart;
  const matches = value.substring(0, cursor).match(/[^0-9]/g);
  if (matches) cursor -= matches.length;
  value = value.replace(/[^0-9]/g, '').substring(0, 6);
  let formatted = '';
  for (let i = 0, n = value.length; i < n; i += 1) {
    if (i === 2) {
      if (formatted.length <= cursor) cursor += 1;
      formatted += '/';
    }
    formatted += value[i];
  }
  if (formatted === e.target.value) return;
  e.target.value = formatted;
  e.target.selectionEnd = cursor;
}

const Page10 = function ({
  step, setstep, questions, setQuestions, data,
}) {
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
  const a = 40.0;
  const b = 10.0;
  const c = a + b;

  const allRadios = [
    new Radio(
      [
        'Credit Card/Debit Card',
        <div className="contain-label-second-part">
          <img src="/assets/images/icons/kissclipart-mastercard-logo-png-clipart-mastercard-credit-card-4497856f6840bcae 1.png" alt="" />
          <img src="/assets/images/icons/pngwing 1.png" alt="" />
          and more...
        </div>,
      ],
      'card',
      [
        new Dependency(
          '* Card Owner',
          'Full Name',
          card_full_name,
          'text',
          basic_text_validation,
        ),
        new Dependency(
          '* Card Number',
          '****  ****  ****  ****',
          card_number,
          'tel',
          basic_number_validation,
          createEntry,
          16,
        ),
        new Dependency(
          '* Card Expiry Date',
          'mm/yyyy',
          card_expiry_date,
          'tel',
          basic_number_validation,
          createDateEntry,
          6,
        ),
        new Dependency(
          '* Card Security Code (CVV2)',
          '***',
          card_security_code,
          'tel',
          basic_number_validation,
          createEntry,
          3,
        ),
      ],
    ),
    new Radio(
      [
        'Pay Pal',
        <div className="contain-label-second-part">
          <img src="/assets/images/icons/pngaaa 1.png" alt="" />
        </div>,
      ],
      'paypal',
    ),
    new Radio(['Pay in $Minority'], 'minority'),
    new Radio(['Electronic Check'], 'electronic-check'),
  ];

  useEffect(() => {
    if (shouldSubmit) {
      console.log(window.localStorage.getItem('jwtToken'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('jwtToken')}`,
        },
      };

      axios
        .post('/', getFormattedOutput(questions, data.email), config)
        .then(() => {
          setstep((prev) => prev + 1);
        })
        .catch((e) => {
          setShouldSubmit(false);
          let feedback = e.response.data.data
            ? e.response.data.data.message
            : e.response.data.message;
          feedback = typeof feedback === 'string' ? [feedback] : Object.values(feedback);
          setServerError(feedback);
        });
    }
  }, [shouldSubmit]);
  useEffect(() => {
    setErrors((prev) => {
      const prevObj = { ...prev };
      prevObj.inputs = [
        ...allRadios[checked].dependencies.map(() => [undefined]),
      ];
      return prevObj;
    });
  }, [checked]);
  function addToQuestion(paymentInfo) {
    addQuestion(setQuestions, step, [
      {
        question: 'Choose your payment method and provide your payment info?',
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
  function validateAgreement() {
    setErrors((prev) => {
      const prevObj = { ...prev };
      prevObj.agreement[0] = agreement.current.checked
        ? ''
        : 'This field is required';
      return prevObj;
    });
  }
  function nextPage() {
    let shouldSubmit = true;
    if (errors.agreement[0] !== '') {
      if (errors.agreement[0] === undefined) {
        validateAgreement();
      }

      shouldSubmit = agreement.current.checked;
    }
    const dependency_arr = allRadios[checked].dependencies;
    const paymentInfo = {};
    for (let i = 0; i < dependency_arr.length; i += 1) {
      if (errors.inputs[i][0] === undefined) {
        const validation = dependency_arr[i].validationFxn(
          dependency_arr[i].ref.current.value,
        );
        if (validation !== '') {
          shouldSubmit = false;
        }
        validateRegularInputs(validation, i);
      } else if (errors.inputs[i][0] !== '') {
        shouldSubmit = false;
      } else {
        paymentInfo[dependency_arr[i].label.replaceAll('*', '').trim()] = dependency_arr[i].ref.current.value;
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
    const popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
  }
  return (
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
              <td>
                $
                {a}
              </td>
            </tr>
            <tr>
              <th>TAXES</th>
              <td>
                $
                {b}
              </td>
            </tr>
            <tr>
              <th>TOTAL</th>
              <th>
                $
                {c}
              </th>
            </tr>
          </tbody>
        </table>
        <h4 className="payment-header">
          Please select your preferred payment method.
        </h4>
        {serverError.length !== 0 ? (
          <div
            className="alert alert-danger"
              // role="alert"
            style={{
              textAlign: 'left',
              fontWeight: '200',
              position: 'relative',
            }}
          >
            <ul>
              {serverError.map((error, index) => <li key={`error${index + 1}`}>{error}</li>)}
            </ul>
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                setServerError([]);
              }}
            >
              &times;
            </div>
          </div>
        ) : null}
        {allRadios.map((radio, index) => (
          <div className="contain-options edit-payment-options" key={`radio${index + 1}`}>
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
              <div className="inline-block" style={{ width: '100%' }}>
                {/* create label for the radio */}
                <label htmlFor={radio.id} className="bold">
                  {radio.label.map((label, idx) => (
                    <span
                      key={`label${idx + 1}`}
                      style={{
                        width: `${(radio.label.length / 2) * 100}%`,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </label>
                {/* inner hidden text */}
                {checked === index ? (
                  <div className="grid">
                    {radio.dependencies.map((dependency, idx) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        key={`dependency${idx + 1}`}
                      >
                        <InputWithIcon
                          id={`paymentOption${index}`}
                          inputRef={dependency.ref}
                          onChange={() => {}}
                          defaultValue=""
                          label={dependency.label}
                          placeholder={dependency.placeholder}
                          iconLink="/assets/images/icons/Group.svg"
                          marginTop
                          color="rgba(0, 0, 0, 0.65)"
                          hideIcon
                          width="100%"
                          maxLength={
                                  dependency.maxLength
                                  && dependency.type === 'tel'
                                    ? dependency.maxLength
                                    : ''
                                }
                          type={dependency.type}
                          onInput={(e) => {
                            dependency.onInput(e);
                            if (errors.inputs[index] !== undefined) {
                              validateRegularInputs(
                                dependency.validationFxn(
                                  dependency.ref.current.value,
                                  dependency.correctLength,
                                ),
                                index,
                              );
                            }
                          }}
                        />
                        {errors.inputs.length > 0
                              && errors.inputs[index][0] !== undefined
                              && errors.inputs[index][0] !== '' ? (
                                <ErrorPrint
                                  errors={errors.inputs[index]}
                                  red
                                  left
                                />
                          ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
        <span className="contain-agree">
          <input
            type="checkbox"
            id="agree"
            ref={agreement}
            onChange={() => {
              if (errors.agreement[0] !== undefined) {
                validateAgreement();
              }
            }}
          />
          <label id="agree" onClick={toggle}>
            {/* <a
                href="https://drive.google.com/file/d/1ZvUac-yvEb-OR2KC8mGmIybU7yIDPuCA/view?usp=sharing"
                target="_blank"
              > */}
            {' '}
            I have read &amp; agree to the terms/warranty
            {/* </a> */}
          </label>
        </span>
        {errors.agreement[0] !== undefined && errors.agreement[0] !== '' ? (
          <ErrorPrint errors={errors.agreement} red left />
        ) : null}
      </div>
      <div className="popup" id="myPopup">
        <div>
          <h1>Terms / Warranty </h1>
          <button type="button" onClick={toggle} id="pop-btn">
            X
          </button>
        </div>
        <p id="terms-txt">
          {' '}
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
  );
};
export default Page10;
