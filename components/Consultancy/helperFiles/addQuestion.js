function addQuestion(setQuestions, step, allQuestions) {
  setQuestions((prev) => {
    return {
      ...prev,
      [`question${step - 1}`]: allQuestions,
    };
  });
}
export default addQuestion;
