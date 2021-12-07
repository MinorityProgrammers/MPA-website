import { useEffect, useState, useRef } from 'react';
import Select from '../customInputTags/select';
import QuestionContainer from '../questionContainer';
import { useDefaultValue } from '../getDefaultValue';
import addQuestion from '../addQuestion';

// structure of childRenderInfo
// --->renderWhenOptionIs = 0
// --->answerToInput = ''
// --->validationFxn = ()=>{}

const default_childRenderInfo = {
  renderWhenOptionIs: 0,
  answerToInput: '',
  validateChild: () => {},
  onStart: () => {},
  childChanged: false,
};

const SelectTemplate = function ({
  step,
  setstep,
  questions,
  setQuestions,
  options = [],
  secondOptions,
  question1 = '',
  children,
  childRenderInfo = default_childRenderInfo,
}) {
  const defaultValueSelected = useDefaultValue(questions, step, 0);
  const defaultSecondValueSelected = useDefaultValue(questions, step, 1);

  const [selected, setSelected] = useState(undefined);

  const [secondSelected, setSecondSelected] = useState(undefined);

  function childFound() {
    return (
      children
      && Number.isInteger(childRenderInfo.renderWhenOptionIs)
      && selected
      && childRenderInfo.renderWhenOptionIs
        === (selected[1] ? options.indexOf(selected[1]) : -1)
    );
  }
  const childStarted = useRef(false);
  useEffect(() => {
    try {
      if (childFound() && !childStarted.current) {
        childRenderInfo.onStart();
        childStarted.current = true;
      }
    } catch (e) {
      console.log();
    }
  }, [selected]);
  function pageFourQuestion() {
    function defineAnswers() {
      const answers = [];
      // first answer
      answers.push({
        question: selected ? selected[0] : '',
        answer: selected ? selected[1] : '',
      });
      // if we have a second input
      if (secondOptions) {
        answers.push({
          question: secondSelected ? secondSelected[0] : '',
          answer: secondSelected ? secondSelected[1] : '',
        });
      }
      // if child, add answer of child
      if (childFound()) {
        answers.push({
          question: selected ? selected[0] : '',
          answer: childRenderInfo.answerToInput,
        });
      }
      return answers;
    }
    addQuestion(setQuestions, step, defineAnswers());
  }
  function shouldSave() {
    let bool = selected instanceof Array;
    if (secondOptions) {
      bool = bool && secondSelected instanceof Array;
    }
    if (childFound()) {
      try {
        bool = bool && childRenderInfo.validateChild();
      } catch (e) {
        bool = false;
      }
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
    pageFourQuestion();

    setstep((prev) => prev - 1);
  };
  const shouldRun = useRef(false);

  useEffect(() => {
    if (shouldRun.current) pageFourQuestion();
    else shouldRun.current = true;
  }, [selected, secondSelected, childRenderInfo.childChanged]);

  return (
    <QuestionContainer left right plus={nextPage} minus={prevPage} step={step}>
      <label
        htmlFor="budget"
        className="questionOption"
        style={{ marginBottom: '2rem' }}
      >
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
            colorScheme={{
              selectedFontColor: 'var(--mpa-navy)',
            }}
          />
        ) : null}
      </Select>
      {childFound() ? children : null}
    </QuestionContainer>
  );
};
export default SelectTemplate;
