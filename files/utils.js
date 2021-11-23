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
