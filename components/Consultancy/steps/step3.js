import { useEffect, useState } from 'react';
import Checkboxes from '../helperFiles/customInputTags/checkbox';
import Select from '../helperFiles/customInputTags/select';
import QuestionContainer from '../helperFiles/questionContainer';
import { useDefaultValue } from '../helperFiles/getDefaultValue';
import addQuestion from '../helperFiles/addQuestion';

const Page3 = function ({
  step, setstep, questions, setQuestions,
}) {
  const defaultValueSelected = useDefaultValue(questions, step, 0);
  const defaultValueCheckboxes = useDefaultValue(questions, step, 1);

  const [selected, setSelected] = useState(undefined);
  const [checkboxes, changeCheckboxValue] = useState(undefined);
  const options = [
    'Business services',
    'Creative industries',
    'Entertainment, Food or Events',
    'Financial services',
    'Health & fitness',
    'Home services',
    'Retail /consumer goods',
    'Texhnology / software',
    'other',
  ];
  const checkBoxLabels = [
    'Deployed Product',
    'UI/UX',
    'Front End',
    'Back End',
    'Product Strategy',
    'Blockchain',
  ];
  const question1 = 'What industry will this project operate in?';
  const question2 = 'Tag your project based on type of work needed.';

  function pageThreeQuestion() {
    addQuestion(setQuestions, step, [
      {
        question: selected ? selected[0] : '',
        answer: selected ? selected[1] : undefined,
      },
      {
        question: checkboxes ? checkboxes[0] : '',
        answer: checkboxes ? checkboxes[1] : undefined,
      },
    ]);
  }
  const nextPage = () => {
    if (selected === undefined) {
      setSelected(null);
    }
    if (checkboxes === undefined) {
      changeCheckboxValue(null);
    }
    if (selected instanceof Array && checkboxes instanceof Array) {
      pageThreeQuestion();
      setstep((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    pageThreeQuestion();
    setstep((prev) => prev - 1);
  };
  useEffect(() => {
    pageThreeQuestion();
  }, [selected, checkboxes]);

  return (
    <QuestionContainer
      left
      right
      marginBottom="2rem"
      plus={nextPage}
      minus={prevPage}
      step={step}
    >
      <label htmlFor="industry" className="questionOption">
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
      />

      <label
        htmlFor="projectType"
        className="questionOption"
        style={{ marginTop: '40px' }}
      >
        {question2}
      </label>
      <Checkboxes
        checkBoxLabels={checkBoxLabels}
        checkboxes={checkboxes}
        setCheckboxes={changeCheckboxValue}
        questionStr={question2}
        defaultValue={defaultValueCheckboxes}
      />
    </QuestionContainer>
  );
};
export default Page3;
