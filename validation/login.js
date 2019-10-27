const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to empty string to use validator functions (validator only works on strings)
  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email address.';
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password should be at least 6 characters.';
  }

  // Return errors object
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
