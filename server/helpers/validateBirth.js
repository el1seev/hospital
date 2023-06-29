const validateBirth = (dateOfBirth) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19\d{2}|[2-9]\d{3})$/;

  if (!dateOfBirth || typeof dateOfBirth !== 'string' || !regex.test(dateOfBirth)) {
    return false;
  }

  const birthYear = parseInt(dateOfBirth.slice(6));
  if (birthYear < 1900) {
    return false;
  }

  return true;
};

module.exports = validateBirth;
