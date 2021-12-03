export const findUserNames = (users) => {
    const allUserNames = [];
  
    users.map((user) => {
        allUserNames.push(user.userName);
    });
  
    return allUserNames;
};