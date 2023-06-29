const createInitials = (firstName, secondName, middleName) => {
  return `${secondName} ${firstName.slice(0,1)}.${middleName.slice(0,1)}.`;
};

export default createInitials;