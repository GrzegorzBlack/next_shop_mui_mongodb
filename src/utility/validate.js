const validate = (values) => {
  const errors = {};

  const item = JSON.parse(window.localStorage.getItem("user"));

  function filterStorage(name, value) {
    if (item) {
      const filtered = item.find((product) => product[name] == value);
      if (filtered) {
        return true;
      }
    } else {
      return false;
    }
  }

  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length > 15) {
    errors.userName = "Must be 15 characters or less";
  } else if (values.userName.length < 3) {
    errors.userName = "Must be 4 character lenght or more";
  } else if (!/^[a-zA-Z0-9]+$/i.test(values.userName)) {
    errors.userName = "User name is invalid";
  } else if (filterStorage("userName", values.userName)) {
    errors.userName = "This login is already used";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (filterStorage("email", values.email)) {
    errors.email = "This email is already used";
  }

  return errors;
};

export default validate;
