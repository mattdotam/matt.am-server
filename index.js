const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
const env = require("./config/env");
require("./services/passport");
const keys = require("./config/keys");

const connectMattdotam = () => {
	return mongoose.connect(
		`mongodb://localhost:${env.port}/mattdotam`
	);
};

connectMattdotam().catch(e => console.error(e));

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());

app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(1337);
