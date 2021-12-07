import {
  useMemo, useState, useRef, useEffect,
} from 'react';
import addQuestion from '../helperFiles/addQuestion';
import Input from '../helperFiles/customInputTags/input';
import { useDefaultValue } from '../helperFiles/getDefaultValue';
import QuestionContainer from '../helperFiles/questionContainer';

const Page2 = function ({
  step, setstep, questions, setQuestions,
}) {
  const defaultValue = useDefaultValue(questions, step, 0);

  console.log(defaultValue, questions);
  const [inputValue, setInputValue] = useState(
    defaultValue || undefined,
  );

  const questionText = 'Tell us about your idea';
  const list_of_errors = ['You must enter an input'];
  function nextPage() {
    if (inputValue === undefined) {
      setInputValue(list_of_errors);
    } else if (typeof inputValue === 'string') {
      setstep((prev) => prev + 1);
    }
  }

  function updateStorage() {
    addQuestion(setQuestions, step, [
      { question: questionText, answer: inputValue },
    ]);
  }
  function handleInputChange(e) {
    if (e.target.value.length === 0) {
      setInputValue(list_of_errors);
    } else {
      setInputValue(e.target.value);
    }
  }
  useEffect(() => {
    updateStorage();
  }, [inputValue]);
  return (
    <QuestionContainer right step={step} plus={nextPage}>
      <div className="service_sub">
        <h2 id="nomarg">{questionText}</h2>
      </div>
      <label htmlFor="idea">
        <p>Project Name</p>
      </label>
      <Input
        inputValue={inputValue}
        handleInputChange={(e) => {
          handleInputChange(e);
        }}
        placeholder="Enter the title of this product."
        defaultValue={defaultValue}
      />
    </QuestionContainer>
  );
};
export default Page2;
