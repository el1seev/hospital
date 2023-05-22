export const removeEmptyFields = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key].length !== 0) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
export const filterObject = (obj) => {
  const filteredObj = { ...obj };
  delete filteredObj.id;
  return filteredObj;
}