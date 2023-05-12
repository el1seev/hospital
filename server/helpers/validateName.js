const validateName = (name) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/;

  if (!name || typeof name !== "string" || !regex.test(name)) {
    return false;
  }

  const specialChars = /[{}[\];,.()?/|\\<>^%$#@!&*№]/;
  if (specialChars.test(name)) {
    return false;
  }

  const digits = /\d/;
  if (digits.test(name)) {
    return false;
  }

  return true;
}

module.exports = validateName;