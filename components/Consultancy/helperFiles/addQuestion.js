function addQuestion(setQuestions, step, allQuestions) {
  setQuestions((prev) => ({
    ...prev,
    [`question${step - 1}`]: allQuestions,
  }));
}
export default addQuestion;
