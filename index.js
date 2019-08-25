const express = require("express");
const app = express();

const env = process.env["env"] || "development";

app.get("/", (req, res) => {
	res.send({ env: env, test: "7" });
});

app.listen(1337);
