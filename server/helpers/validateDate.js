const validateDate = (date) => {
  const regex = /^([0-2]\d|3[0-1])-(0\d|1[0-2])-\d{4}$/;
  
  if (!date || typeof date !== "string" || !regex.test(date)) {
    return false;
  }

  const [day, month, year] = date.split("-");
  const dateObject = new Date(`${year}-${month}-${day}`);
  if (dateObject.toString() === "Invalid Date") {
    return false;
  }

  return true;
}

module.exports = validateDate;
