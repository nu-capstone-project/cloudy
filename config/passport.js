// Passport is an unobtrusive authentication middleware for Node.js
// Import JSON Web Token strategy for Passport library
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// User auth data will be exchanged using signed JSON web tokens

module.exports = passport => {
	passport.use(
        // Create new JWT Strategy for use with Passport authentication library
        // opts contains options to control how the token is extracted from the request or verified
        new JwtStrategy(opts, (jwt_payload, done) => {
            // jwt_payload contains decoded jsonwebtoken data
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch(err => console.log(err));
		})
	);
};
