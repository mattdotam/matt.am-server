const mongoose = require("mongoose");
const Commit = mongoose.model("commit");
const Tweet = mongoose.model("tweet");
const Devlog = mongoose.model("devlog");
const Sleep = mongoose.model("sleep");
const Workout = mongoose.model("workout");
const Meal = mongoose.model("meal");
const Supplement = mongoose.model("supplement");
const Measure = mongoose.model("measure");

module.exports = app => {
	app.get("/api/track/health/:date", async (req, res) => {
		const results = {
			workouts: [],
			meals: [],
			supplements: [],
			measures: [],
			sleeps: [],
		};
		results.sleeps = await Sleep.find({
			$or: [
				{
					from: {
						$gte: Number(req.params.date),
						$lte: Number(req.params.date) + 86399,
					},
				},
				{
					to: {
						$gte: Number(req.params.date),
						$lte: Number(req.params.date) + 86399,
					},
				},
			],
		}).select({
			_id: false,
			id: false,
		});
		results.workouts = await Workout.find({
			timestamp: {
				$gte: req.params.date,
				$lte: Number(req.params.date) + 86399,
			},
		}).select({
			_id: false,
			id: false,
			"activities._id": false,
			"activities.id": false,
			"activities.sets._id": false,
		});
		results.meals = await Meal.find({
			timestamp: {
				$gte: req.params.date,
				$lte: Number(req.params.date) + 86399,
			},
		}).select({
			id: false,
			_id: false,
			"food._id": false,
			"food.name": false,
			"food.quantity": false,
			"food.unit": false,
		});
		results.supplements = await Supplement.find({
			timestamp: {
				$gte: req.params.date,
				$lte: Number(req.params.date) + 86399,
			},
		});
		results.measures = await Measure.find({
			timestamp: {
				$lte: Number(req.params.date) + 86399,
			},
		})
			.select({ weight: true, timestamp: true, _id: false })
			.sort({ timestamp: -1 })
			.limit(2);
		res.send(results);
	});
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
