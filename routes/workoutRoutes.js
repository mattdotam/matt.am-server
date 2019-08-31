const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Workout = mongoose.model("workout");

module.exports = app => {
	app.post("/api/workouts", requireLogin, (req, res) => {
		const { id, timestamp } = req.body;
		const [activities] = req.body;

		const workout = new Workout({
			id,
			timestamp,
			activities: activities.map(a => ({
				name: a.name,
				tags: a.tags,
				comment: a.comment,
				distance: a.distance,
				duration: a.duration,
				sets: a.sets.map(s => ({
					reps: s.reps,
					weight: s.weight,
				})),
			})),
		});

		try {
			workout.save();
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
