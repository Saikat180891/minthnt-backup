export const makeQuery = (obj) =>
  Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");

export const jsonToFormData = (obj = {}) => {
  const formdata = new FormData();
  for (let key in obj) {
    formdata.set(key, obj[key]);
  }
  return formdata;
};
