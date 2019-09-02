const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Workout = mongoose.model("workout");

module.exports = app => {
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
		} catch (err) {
			res.status(422).send(err);
		}

		res.redirect(`/fit/${workout.id}`);
	});
};
