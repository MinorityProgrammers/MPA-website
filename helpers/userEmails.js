export const findUserEmails = (users) => {
  const allUserEmails = [];

  users.map((user) => {
    allUserEmails.push(user.email);
  });

  return allUserEmails;
};
