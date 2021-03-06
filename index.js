const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Commit");
require("./models/Kata");
require("./models/Tweet");
require("./models/Devlog");
require("./models/Sleep");
require("./models/Exercise");
require("./models/Workout");
require("./models/Food");
require("./models/Meal");
require("./models/SupplementRef");
require("./models/Supplement");
require("./models/Measure");
require("./models/Coursenote");
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
require("./routes/exerciseRoutes")(app);
require("./routes/workoutRoutes")(app);
require("./routes/foodRoutes")(app);
require("./routes/mealRoutes")(app);
require("./routes/measureRoutes")(app);
require("./routes/supplementRefRoutes")(app);
require("./routes/supplementRoutes")(app);
require("./routes/coursenoteRoutes")(app);

if (env.env === "production") {
	const root = path.join(__dirname, "client", "build");
	app.use(express.static(root));
	app.get("/*", (req, res) => {
		res.sendFile("index.html", { root });
	});
}

app.listen(1337);
