const mongoose = require("mongoose");
const Commit = mongoose.model("commit");

module.exports = app => {
	app.get("/api/track/:date", (req, res) => {
		console.log(req.params.date);
		Commit.find({}).then(data => {
			console.log(data);
			res.send(data);
		});
	});
};
