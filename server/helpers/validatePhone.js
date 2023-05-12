const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\+375(25|33|44|29)\d{3}\d{2}\d{2}$/;
  
  if (!phoneNumber || typeof phoneNumber !== "string" || !regex.test(phoneNumber)) {
    return false;
  }

  return true;
}

module.exports = validatePhoneNumber;