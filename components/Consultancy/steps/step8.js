import SelectTemplate from "../helperFiles/templates/selectTemplate";

function Page8({ step, setstep, questions, setQuestions }) {
  return (
    <SelectTemplate
      step={step}
      setstep={setstep}
      questions={questions}
      setQuestions={setQuestions}
      options={[
        "ASAP",
        "Within a week",
        "Within a few weeks",
        "Within a month",
        "Within a few months",
        "I would like to discuss this.",
        "Other",
      ]}
      question1="When are you likely to launch? "
    />
  );
}
export default Page8;
