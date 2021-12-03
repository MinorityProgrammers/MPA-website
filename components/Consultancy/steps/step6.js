import { useRef, useState, useEffect, Fragment } from "react";
import addQuestion from "../helperFiles/addQuestion";
import { useDefaultValue } from "../helperFiles/getDefaultValue";
import QuestionContainer from "../helperFiles/questionContainer";
import ErrorPrint from "../helperFiles/errorPrint";
import BlurBackground from "../helperFiles/blurBackground";
import OverlayCard from "../helperFiles/overlayCard";
import InputWithIcon from "../helperFiles/customInputTags/inputWithIcon";

const defaultRadio = 2;
const options = [
  "Delegate review and approval to your representative.",
  "Delegate review and approval to the MPA Project Manager.",
  "No, I prefer reviewing tasks on my own.",
];
function Page6({ step, setstep, questions, setQuestions }) {
  const [showConfirmation, setShowConfirmation] = useState(0);

  //get default values
  const defaultValue = useDefaultValue(questions, step, 0);
  //inputs
  const selectedOption = useRef(
    defaultValue.selectedOption !== undefined
      ? options.indexOf(defaultValue.selectedOption)
      : defaultRadio
  );

  const fullname = useRef();
  const mpa_identity = useRef();
  const needs_input = useRef();
  //error
  const errorMsgDefault = [[], []];
  const [errorMsg, setErrorMsg] = useState(errorMsgDefault);

  //add new question
  function addToQuestion() {
    addQuestion(setQuestions, step, [
      {
        question: "Would you like to delegate review?",
        answer: {
          selectedOption: options[selectedOption.current],
          otherInfo: [fullname.current.value, mpa_identity.current.value],
        },
      },
    ]);
  }
  //create an error message based on the string in the input field
  function checksForInputs(string, errorIndex) {
    setErrorMsg((prev) => {
      const prevArr = [...prev];
      if (string.length === 0)
        prevArr[errorIndex].push("This field cannot be left empty");
      else prevArr[errorIndex] = [];

      return prevArr;
    });
  }
  //run a function when the needs_input reference is defined
  function checkInputChanges(fxn = () => {}) {
    if (needs_input.current.checked) {
      fxn();
    }
  }
  //validate the first input
  function validateTextOne() {
    checksForInputs(fullname.current.value, 0);
  }
  //validate the second input
  function validateTextTwo() {
    checksForInputs(mpa_identity.current.value, 1);
  }
  //when radio input changes
  function onChangeRadio(index) {
    selectedOption.current = index;
    if (needs_input.current) {
      checkInputChanges(() => {
        validateTextOne();
        validateTextTwo();
      });
      if (!needs_input.current.checked) {
        setErrorMsg(errorMsgDefault);
      }
    }
  }
  //when a text input changes
  function onChangeText(fxn) {
    if (needs_input.current) {
      checkInputChanges(fxn);
    }
  }

  //navigate to next page
  function nextPage() {
    //if inputs are invalid, submission should be voided for the first radio
    if (errorMsg[0].length === 0 && errorMsg[1].length === 0) {
      if (selectedOption.current === 0) {
        setShowConfirmation(1);
      }
    }
    //add second radio to the question and submit
    if (selectedOption.current === 2) {
      addToQuestion();
      setstep((prev) => prev + 1);
    }
    //add third radio to the question and submit
    if (selectedOption.current === 1) {
      setShowConfirmation(2);
    }
  }
  //return to prev page
  function prevPage() {
    addToQuestion();
    setstep((prev) => prev - 1);
  }
  //remove overflow blockage on body
  function overflow() {
    document.body.classList.remove("hide-overflow");
  }
  //agree to the terms
  function agree() {
    overflow();
    addToQuestion();
    setstep((prev) => prev + 1);
  }
  //edit choices
  function makeChanges() {
    overflow();
    setShowConfirmation(0);
  }
  //Ensure that using default value does not cause incorrect passage
  useEffect(() => {
    onChangeRadio(selectedOption.current);
  }, []);
  useEffect(() => {
    addToQuestion();
  }, [selectedOption.current]);
  const buttons = (
    <div className="contain-buttons">
      <button className="btn-1" onClick={agree}>
        Agree
      </button>
      <button className="btn-2" onClick={makeChanges}>
        Cancel &amp; Close
      </button>
    </div>
  );
  return (
    <Fragment>
      <QuestionContainer
        left
        right
        step={step}
        plus={nextPage}
        minus={prevPage}
        id="page6"
        marginBottom="1rem"
      >
        <div className="page6-container">
          {/* page header */}
          <h1>
            You have the option to delegate the review and approval of task
            increments to the <span>PM who send you the quote</span> or{" "}
            <span>a representative you trust!</span> This person would need a
            MPA account.
          </h1>
          {/* checkbox option 1 */}
          <div className="contain-options">
            {/* wrap holding all data in option 1 */}
            <div className="wrap">
              {/* checkbox input */}
              <input
                type="radio"
                className="page6-radio"
                id="rep"
                name="page-selection"
                defaultChecked={selectedOption.current === 0}
                onChange={(e) => {
                  // addToQuestion();
                  onChangeRadio(0);
                }}
                ref={needs_input}
              />

              <div className="inline-block">
                {/* create label for the radio */}
                <label htmlFor="rep" className="bold">
                  {options[0]}
                </label>
                {/* creating a label for the first text input */}

                <InputWithIcon
                  inputRef={fullname}
                  onChange={(e) => {
                    addToQuestion();
                    onChangeText(e);
                  }}
                  defaultValue={
                    defaultValue.otherInfo ? defaultValue.otherInfo[0] : ""
                  }
                  validationMethod={validateTextOne}
                  label="*Full Name"
                  placeholder="Enter Representative Full Name"
                  iconLink="/assets/images/icons/Group 15.svg"
                  marginTop
                />
                {errorMsg[0].length > 0 ? (
                  <ErrorPrint errors={errorMsg[0]} red />
                ) : null}
                {/* the email input */}
                <InputWithIcon
                  inputRef={mpa_identity}
                  onChange={(e) => {
                    addToQuestion();
                    onChangeText(e);
                  }}
                  defaultValue={
                    defaultValue.otherInfo ? defaultValue.otherInfo[1] : ""
                  }
                  validationMethod={validateTextTwo}
                  marginTop
                  label=" *E-mail Address or MPA username"
                  placeholder="Enter representative E-mail address or username"
                  iconLink="/assets/images/icons/Group.svg"
                />
                {errorMsg[1].length > 0 ? (
                  <ErrorPrint errors={errorMsg[1]} red />
                ) : null}
              </div>
            </div>
            {/* this is the second checkbox section */}
            <div className="wrap margin-top">
              {/* the radio input for the second input */}
              <input
                type="radio"
                className="page6-radio"
                id="manager"
                name="page-selection"
                defaultChecked={selectedOption.current === 1}
                onChange={(e) => {
                  // addToQuestion();
                  onChangeRadio(1);
                }}
              />

              <div className="inline-block">
                {/* the label for this checkbox */}
                <label htmlFor="manager" className="bold">
                  {options[1]}
                </label>
              </div>
            </div>
            {/* this is the third checkbox section */}
            <div className="wrap margin-top">
              {/* the radio input for the third input */}
              <input
                type="radio"
                className="page6-radio"
                id="myself"
                name="page-selection"
                defaultChecked={selectedOption.current === 2}
                onChange={(e) => {
                  onChangeRadio(2);
                }}
              />
              <div className="inline-block">
                {/* the label for this checkbox */}
                <label htmlFor="myself" className="bold">
                  {options[2]}
                </label>
              </div>
            </div>
          </div>
        </div>
      </QuestionContainer>
      {showConfirmation > 0 ? (
        <BlurBackground>
          <OverlayCard>
            {showConfirmation === 1 ? (
              <Fragment>
                * If you delegate the task approval and subsequent release of
                payment to your Project Manager -
                <ul>
                  <li>
                    You would be at the risk of having lesser control over the
                    outcome of your project
                  </li>
                  <li>
                    This would increase the total payment by an additional 7%.
                  </li>
                  <li>
                    7% of payment for completion of each task would be rewarded
                    to the PM for task approval.
                  </li>
                </ul>
                {buttons}
              </Fragment>
            ) : (
              <Fragment>
                * If you delegate the task approval and subsequent release of
                payment to a representative of your choice, you would be at the
                risk of having lesser control over the outcome of your project.
                {buttons}
              </Fragment>
            )}
          </OverlayCard>
        </BlurBackground>
      ) : null}
    </Fragment>
  );
}
export default Page6;
