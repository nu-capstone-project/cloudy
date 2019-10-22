const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Bodyparser middleware
// For url-encoded requests
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
// For json requests
app.use(bodyParser.json());

// DB Config
const dbURI = require("./config/keys").mongoURI;

// Connect to MongoDB instance
mongoose
	.connect(dbURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log("MongoDB connected!"))
	.catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

// Start listening on port
app.listen(port, () => console.log(`Server running on port ${port}!`));

