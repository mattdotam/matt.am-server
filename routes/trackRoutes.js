const mongoose = require("mongoose");
const Commit = mongoose.model("commit");
const Tweet = mongoose.model("tweet");
const Devlog = mongoose.model("devlog");

module.exports = app => {
	app.get("/api/track/commits/:date", (req, res) => {
		Commit.find({
			timestamp: {
				$gte: req.params.date,
				$lte: Number(req.params.date) + 86399,
			},
		}).then(data => {
			res.send(data);
		});
	});
	app.get("/api/track/tweets/:date", (req, res) => {
		Tweet.find({
			timestamp: {
				$gte: Number(req.params.date) + 14400,
				$lte: Number(req.params.date) + 100799,
			},
		}).then(data => {
			res.send(data);
		});
	});
	app.get("/api/track/devlogs/:date", (req, res) => {
		Devlog.find({
			date: String(req.params.date),
		}).then(data => {
			res.send(data);
		});
	});
};
