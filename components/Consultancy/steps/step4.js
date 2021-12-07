import SelectTemplate from '../helperFiles/templates/selectTemplate';

const Page4 = function ({
  step, setstep, questions, setQuestions,
}) {
  return (
    <SelectTemplate
      step={step}
      setstep={setstep}
      questions={questions}
      setQuestions={setQuestions}
      options={[
        'Less than $500',
        '$500 -$2999',
        '$3000 - $4999',
        '$5000 or more',
        'Other',
      ]}
      secondOptions={['USD']}
      question1="Select your estimated budget for this project? "
    />
  );
};
export default Page4;
