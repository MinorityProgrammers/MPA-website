import { useState, useRef, useEffect } from "react";
import TagInput from "../helperFiles/customInputTags/tagInput";
import QuestionContainer from "../helperFiles/questionContainer";
import { useDefaultValue } from "../helperFiles/getDefaultValue";
import addQuestion from "../helperFiles/addQuestion";
import ErrorPrint from "../helperFiles/errorPrint";

function Page5({ step, setstep, questions, setQuestions }) {
  const minimumChar = 150;
  //get default values
  const defaultProjectDetail = useDefaultValue(questions, step, 0);
  const defaultInspitation = useDefaultValue(questions, step, 1);
  const defaultTags = useDefaultValue(questions, step, 2);
  console.log(defaultProjectDetail, defaultTags, defaultTags);
  //all question
  const question1 = "Project details";
  const question2 = "Any inspiration websites?";
  const question3 = "Any preferred tech stack?";
  const question3Placeholder1 = "Please enter to add front end tag.";
  const question3Placeholder2 = "Please enter to add development tag.";
  const question3Placeholder3 = "Please enter to add back end tag.";
  const question3Placeholder4 = "Please enter to add UI UX tag.";
  const question3Placeholder5 = "Please enter to add blockchain tag.";
  //references for the inputs
  const projectDetails = useRef();
  const inspirationLink = useRef();
  //should print error message?
  const [errorMessage, setErrorMessage] = useState(undefined);
  //states for my tag inputs
  const [listOfTagsA, updateListOfTagsA] = useState(
    defaultTags ? defaultTags[0] : []
  );
  const [listOfTagsB, updateListOfTagsB] = useState(
    defaultTags ? defaultTags[1] : []
  );
  const [listOfTagsC, updateListOfTagsC] = useState(
    defaultTags ? defaultTags[2] : []
  );
  const [listOfTagsD, updateListOfTagsD] = useState(
    defaultTags ? defaultTags[3] : []
  );
  const [listOfTagsE, updateListOfTagsE] = useState(
    defaultTags ? defaultTags[4] : []
  );

  function addToQuestion() {
    addQuestion(setQuestions, step, [
      {
        question: question1,
        answer: projectDetails.current ? projectDetails.current.value : "",
      },
      {
        question: question2,
        answer: inspirationLink.current ? inspirationLink.current.value : "",
      },
      {
        question: question3,
        answer: [
          listOfTagsA,
          listOfTagsB,
          listOfTagsC,
          listOfTagsD,
          listOfTagsE,
        ],
      },
    ]);
  }
  //error messsage reporting
  function setInvalidMessage() {
    setErrorMessage([
      `This field must have a minimum of ${
        minimumChar -
        (projectDetails.current ? projectDetails.current.value.length : 0)
      } character(s)`,
    ]);
  }
  function ValidateCompulsoryMessage() {
    return (
      projectDetails.current &&
      projectDetails.current.value.length >= minimumChar
    );
  }
  function nextPage() {
    if (ValidateCompulsoryMessage()) {
      addToQuestion();
      setstep((prev) => prev + 1);
    } else {
      setInvalidMessage();
    }
  }
  function onChange() {
    if (errorMessage !== undefined) {
      if (!ValidateCompulsoryMessage()) {
        setInvalidMessage();
      } else {
        setErrorMessage(false);
      }
    }
  }
  //end of error message reporting
  function prevPage() {
    addToQuestion();
    setstep((prev) => prev - 1);
  }

  useEffect(() => {
    addToQuestion();
  }, [listOfTagsA, listOfTagsB, listOfTagsC, listOfTagsD, listOfTagsE]);
  return (
    <QuestionContainer
      left
      right
      plus={nextPage}
      minus={prevPage}
      marginBottom="1rem"
      step={step}
      id="page5"
    >
      <div className="flex-row">
        <section className="space1">
          <label htmlFor="page5-textarea">* {question1}</label>
          <textarea
            id="page5-textarea"
            className="page5-textarea"
            placeholder="Briefly explain your project idea."
            ref={projectDetails}
            defaultValue={defaultProjectDetail ? defaultProjectDetail : ""}
            onChange={(e) => {
              addToQuestion();
              onChange(e);
            }}
          ></textarea>
          {errorMessage ? <ErrorPrint errors={errorMessage} /> : null}
        </section>
        <section className="space2">
          <label htmlFor="page5-input">{question2}</label>
          <input
            placeholder="Enter website link"
            className="page5-input"
            type="text"
            id="page5-input"
            ref={inspirationLink}
            defaultValue={defaultInspitation ? defaultInspitation : ""}
            onChange={(e) => {
              addToQuestion();
            }}
          />
          <label htmlFor="" style={{ marginTop: "2rem" }}>
            {question3}
          </label>
          {/* all tag input */}
          <TagInput
            listOfTags={listOfTagsA}
            updateListOfTags={updateListOfTagsA}
          >
            {question3Placeholder1}
          </TagInput>
          <TagInput
            listOfTags={listOfTagsB}
            updateListOfTags={updateListOfTagsB}
          >
            {question3Placeholder2}
          </TagInput>
          <TagInput
            listOfTags={listOfTagsC}
            updateListOfTags={updateListOfTagsC}
          >
            {question3Placeholder3}
          </TagInput>
          <TagInput
            listOfTags={listOfTagsD}
            updateListOfTags={updateListOfTagsD}
          >
            {question3Placeholder4}
          </TagInput>
          <TagInput
            listOfTags={listOfTagsE}
            updateListOfTags={updateListOfTagsE}
          >
            {question3Placeholder5}
          </TagInput>
          {/* end of all tag input */}
        </section>
      </div>
      <div>
        <a href="#" className="getting-help">
          Need Help?
        </a>
      </div>
    </QuestionContainer>
  );
}
export default Page5;
