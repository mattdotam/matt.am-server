const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Exercise = mongoose.model("exercise");
const Workout = mongoose.model("workout");

module.exports = app => {
	app.get("/api/exercises", (req, res) => {
		Exercise.find({}).then(data => {
			res.status(200).send(data);
		});
	});
	app.get("/api/exercises/:query", requireLogin, async (req, res) => {
		const id = req.params.query;
		const {
			action = "perform",
			find = "past",
			number = 1,
			at = Math.floor(Date.now() / 1000),
		} = req.query;

		let results = [];
		if (action === "perform") {
			if (find === "past") {
				results = await Workout.find({
					$and: [
						{
							timestamp: {
								$lt: Number(at),
							},
						},
						{
							"activities.id": { $eq: id },
						},
					],
				})
					.select({ timestamp: true, _id: false, activities: true })
					.sort({ timestamp: -1 })
					.limit(Number(number));
			} else if (find === "future") {
				results = await Workout.find({
					$and: [
						{
							timestamp: {
								$gt: Number(at),
							},
						},
						{
							"activities.id": { $eq: id },
						},
					],
				})
					.select({ timestamp: true, _id: false, activities: true })
					.sort({ timestamp: 1 })
					.limit(Number(number));
			}
		}
		res.send(results);
	});
	app.post("/api/exercises", requireLogin, (req, res) => {
		const { id, name, tags } = req.body;
		const exercise = new Exercise({
			id,
			name,
			tags,
		});
		try {
			exercise.save();
			res.status(201).send();
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/exercises", requireLogin, (req, res) => {
		const { id, name, tags } = req.body;
		Exercise.update({ id: id }, { name, tags }).then(data => {
			res.status(200).send(data);
		});
	});
	app.delete("/api/exercises/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Exercise.deleteOne({ id: id }, err => {
			res.send(err);
		}).then(res => {
			res.status(200).send(res);
		});
	});
};
