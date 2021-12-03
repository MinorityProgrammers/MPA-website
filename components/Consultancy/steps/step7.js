import SelectTemplate from "../helperFiles/templates/selectTemplate";

function Page7({ step, setstep, questions, setQuestions }) {
  return (
    <SelectTemplate
      step={step}
      setstep={setstep}
      questions={questions}
      setQuestions={setQuestions}
      options={[
        "Personal project",
        "Sole Trader / self employed",
        "Small business ( 1 - 9 employees )",
        "Medium business ( 10 - 29 employees ) ",
        "Large business ( 10 - 29 employees ) ",
        "Extra Large business ( 100 or more ) ",
        "Charity / Non profit",
        "Other",
      ]}
      question1="What size of business is this project for ? "
    />
  );
}
export default Page7;
