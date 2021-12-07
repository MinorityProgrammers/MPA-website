export function getFormattedOutput(questions, myEmail) {
  const prefix = 'question';
  const getArray = (index, innerIndex) => questions[prefix + index][innerIndex];
  return {
    project_name: getArray(0, 0).answer,
    industry: getArray(1, 0).answer,
    project_budget: getArray(2, 0).answer,
    budget_currency: getArray(2, 1).answer,
    project_stacks: getArray(3, 2).answer,
    PM_fullName: getArray(4, 0).answer?.otherInfo[0],
    Agree_terms: true,
    project_size: getArray(5, 0).answer,
    project_details: getArray(3, 0).answer,
    webiste: getArray(3, 1).answer,
    project_tags: getArray(1, 1).answer,
    PM_email: getArray(4, 0).answer?.otherInfo[1],
    contact_email:
      questions[prefix + 7].length === 2 ? getArray(7, 1).answer : myEmail,

    launch_date: getArray(6, 0).answer,
    pay_option: getArray(8, 0).answer.paymentMethod,
  };
}
