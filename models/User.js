const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create user schema from Schema object from mongoose

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// Export user schema
const User = mongoose.model('users', UserSchema);
module.exports = User;