const findUserNames = (users) => {
  const allUserNames = users.map((user) => user.userName);
  return allUserNames;
};

export default findUserNames;
