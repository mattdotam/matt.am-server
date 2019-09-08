const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Workout = mongoose.model("workout");

module.exports = app => {
	app.get("/api/workouts", (req, res) => {
		Workout.find({}).then(data => {
			let results = [];
			data.forEach(r =>
				results.push({ id: r.id, timestamp: r.timestamp })
			);
			res.status(200).send(results);
		});
	});
	app.get("/api/workouts/:id", (req, res) => {
		Workout.find({ id: req.params.id }).then(data => {
			res.send(data);
		});
	});
	app.post("/api/workouts", requireLogin, (req, res) => {
		const { id, timestamp, activities } = req.body;
		const workout = new Workout({
			id,
			timestamp,
			activities: activities.map(a => {
				if (Array.isArray(a.sets)) {
					return {
						name: a.name,
						id: a.id,
						tags: a.tags,
						comment: a.comment,
						distance: a.distance,
						duration: a.duration,
						sets: a.sets.map(s => {
							return {
								reps: s.reps,
								weight: s.weight,
							};
						}),
					};
				} else {
					return {
						name: a.name,
						id: a.id,
						tags: a.tags,
						comment: a.comment,
						distance: a.distance,
						duration: a.duration,
						sets: null,
					};
				}
			}),
		});
		try {
			workout.save();
			res.status(201).send(workout.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/workouts", requireLogin, (req, res) => {
		const { id, timestamp } = req.body;
		const activities = req.body.activities.map(a => {
			if (Array.isArray(a.sets)) {
				return {
					name: a.name,
					id: a.id,
					tags: a.tags,
					comment: a.comment,
					distance: a.distance,
					duration: a.duration,
					sets: a.sets.map(s => {
						return {
							reps: s.reps,
							weight: s.weight,
						};
					}),
				};
			} else {
				return {
					name: a.name,
					id: a.id,
					tags: a.tags,
					comment: a.comment,
					distance: a.distance,
					duration: a.duration,
					sets: null,
				};
			}
		});
		Workout.update({ id }, { timestamp, activities }).then(data => {
			res.status(200).send(data);
		});
	});
	app.delete("/api/workouts/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Workout.deleteOne({ id }, err => {
			res.send(err);
		}).then(res => {
			res.status(200).send(res);
		});
	});
};
