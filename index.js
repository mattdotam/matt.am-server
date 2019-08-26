const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
require("./models/User");

const env = process.env["env"] || "development";

if (env === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "client", "build", "index.html")
		);
	});
}

const connectMattdotam = () => {
	return mongoose.connect("mongodb://localhost:27020/mattdotam");
};

connectMattdotam().catch(e => console.error(e));

app.get("/", (req, res) => {
	res.send({
		hi: "there",
	});
});

app.listen(1337);
