const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const env = process.env["env"] || "development";

if (env === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "client", "build", "index.html")
		);
	});
}

app.get("/", (req, res) => {
	res.send({
		hi: "there",
	});
});

app.listen(1337);
