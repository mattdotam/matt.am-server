const express = require("express");
const app = express();

const target = process.env.TARGET || null;

app.get("/", (req, res) => {
	res.send({
		hi: "there",
		target: target,
	});
});

app.listen(1337);
