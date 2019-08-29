const mongoose = require("mongoose");
const Commit = mongoose.model("commit");

module.exports = app => {
	app.get("/api/track/", (req, res) => {
		Commit.find({}).then(data => {
			res.send(data);
		});
	});
};
