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

export const isValidFileName = (fileName) => {
  const isValid =
    String(fileName).includes(".") && String(fileName).split(".").length > 1;
  return isValid;
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const sortArray = (arr) => {
  return arr.sort((a, b) => {
    return a.key - b.key;
  });
};

export const regexCodes = {
  username: /^[A-z][A-z0-9-_]{3,23}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,7})+$/,
};

export const formInputGuide = {
  fullName: `Enter proper full name including Firstname & Lastname like, Robert Downey Jr`,
  userName: `4 to 24 characters.
  Must begin with a letter. Letters, numbers, underscores, hyphens allowed.`,
  email: `Enter valid email containing username, "@" and provider name, like username@gmail.com`,
  password: `8 to 24 characters.
  Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: !@#$%`,
};

export const CompareObjects = (x, y) => {
  let objectsAreSame = true;
  for (let propertyName in x) {
    if (x[propertyName] !== y[propertyName]) {
      objectsAreSame = false;
      break;
    }
  }
  return objectsAreSame;
};
