const validatePassport = (passportId) => {
  const regex = /^(AB|АВ|BM|ВМ|HB|НВ|KH|КН|MP|МР|MC|МС|KB|КВ|PP|РР|SP|DP)\d{7}$/;

  if (!passportId || typeof passportId !== 'string' || !regex.test(passportId)) {
    return false;
  }
  const passportNumber = passportId.slice(2);
  if (passportNumber < '0000101') {
    return false;
  }

  return true;
};

module.exports = validatePassport;
