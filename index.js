const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Commit");
const env = require("./config/env");
require("./services/passport");
const keys = require("./config/keys");

const connectMattdotam = () => {
	return mongoose.connect(
		`mongodb://${keys.mongo}@localhost:${env.port}/mattdotam`,
		{ useNewUrlParser: true }
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
require("./routes/trackRoutes")(app);

if (env.env === "production") {
	const root = require("path").join(__dirname, "client", "build");
	app.use(express.static(root));
	app.get("*", (req, res) => {
		res.sendFile("index.html", { root });
	});
}

app.listen(1337);
