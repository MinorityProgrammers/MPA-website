const findUserEmails = (users) => {
  const allUserEmails = users.map((user) => user.email);
  return allUserEmails;
};

export default findUserEmails;
