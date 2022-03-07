const REGEX_VALUES = {
  LOGIN_REGEX: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
  PASSWORD_REGEX: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}",
};

export default REGEX_VALUES;
