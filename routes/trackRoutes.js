const mongoose = require("mongoose");
const Commit = mongoose.model("commit");

module.exports = app => {
	app.get("/api/track/:date", (req, res) => {
		Commit.find({
			timestamp: {
				$gte: req.params.date,
				$lte: Number(req.params.date) + 86399,
			},
		}).then(data => {
			res.send(data);
		});
	});
};
