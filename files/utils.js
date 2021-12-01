import { useSnackbar } from "notistack";

export function validateEmail(email) {
  var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,7})+$/;
  if (reg.test(email)) {
    return true;
  } else {
    return false;
  }
}

export function validatePassword(password) {
  var format = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
  if (password.match(format)) {
    return true;
  } else {
    return false;
  }
}

export const splitAtIndex = (value, index) => {
  return value.substring(0, index);
};

export const splitAtCharacter = (value, character) => {
  return value.split(character);
};

export const extractExtentionAndLanguage = (fileName, languages) => {
  let stringArr = splitAtCharacter(fileName, ".");
  let extention =
    stringArr?.length === 2
      ? `.${stringArr[1]}`
      : `.${stringArr[stringArr?.length - 1]}`;

  let language = languages?.find((lang) => {
    let langsStr = lang.extensions.join();
    return langsStr.includes(extention);
  });
  return [extention, language];
};

export const fetcher = (url) => fetch(url).then((res) => res.json());
