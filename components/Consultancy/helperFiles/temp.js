import React, { useState } from 'react';
import Select from './customInputTags/select';
import QuestionContainer from './questionContainer';
import useDefaultValue from './getDefaultValue';
import addQuestion from './addQuestion';

const SelectTemplate = ({
  step,
  setstep,
  questions,
  setQuestions,
  options = [],
  secondOptions,
  question1 = '',
}) => {
  const defaultValueSelected = useDefaultValue(questions, step, 0);
  const defaultSecondValueSelected = useDefaultValue(questions, step, 1);

  const [selected, setSelected] = useState(undefined);

  const [secondSelected, setSecondSelected] = useState(undefined);

  function pageFourQuestion() {
    if (secondOptions) {
      addQuestion(setQuestions, step, [
        { question: selected[0], answer: selected[1] },
        { question: secondSelected[0], answer: secondSelected[1] },
      ]);
    } else {
      addQuestion(setQuestions, step, [
        { question: selected[0], answer: selected[1] },
      ]);
    }
  }
  function shouldSave() {
    let bool = selected instanceof Array;
    if (secondOptions) {
      bool = bool && secondSelected instanceof Array;
    }
    return bool;
  }

  const nextPage = () => {
    if (selected === undefined) {
      setSelected(null);
    }

    if (shouldSave()) {
      pageFourQuestion();
      setstep((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (shouldSave()) {
      pageFourQuestion();
    }

    setstep((prev) => prev - 1);
  };

  return (
    <QuestionContainer left right plus={nextPage} minus={prevPage} step={step}>
      <label htmlFor="budget" className="questionOption">
        {question1}
      </label>
      <Select
        options={options}
        selected={selected}
        setSelected={setSelected}
        questionStr={question1}
        defaultValue={
          defaultValueSelected ? options.indexOf(defaultValueSelected) : -1
        }
        watchNull={secondOptions ? secondSelected === undefined : false}
      >
        {secondOptions ? (
          <Select
            options={secondOptions}
            selected={secondSelected}
            setSelected={setSecondSelected}
            questionStr={question1}
            turnOffLeftBorder
            defaultStr="..."
            defaultValue={
              defaultSecondValueSelected
                ? secondOptions.indexOf(defaultSecondValueSelected)
                : -1
            }
          />
        ) : null}
      </Select>
    </QuestionContainer>
  );
};
export default SelectTemplate;
