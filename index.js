const express = require("express");
const app = express();

const env = process.env.env || "development";

app.get("/", (req, res) => {
	res.send({ env: env });
});

app.listen(1337);
