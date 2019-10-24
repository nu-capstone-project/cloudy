const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
	let errors = {};
	// Convert empty fields to empty string to use validator functions (validator only works on strings)
	data.name = isEmpty(data.name) ? "" : data.name;
	data.email = isEmpty(data.email) ? "" : data.email;
	data.password = isEmpty(data.password) ? "" : data.password;
	data.password2 = isEmpty(data.password2) ? "" : data.password2;

	// Name checks
	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required.";
	}

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required.";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Invalid email address.";
	}

	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required.";
	} else if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords do not match.";
	} else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password should be at least 6 characters.";
	}

	// Return errors object
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
