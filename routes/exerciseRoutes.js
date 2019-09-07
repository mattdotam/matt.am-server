const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Exercise = mongoose.model("exercise");

module.exports = app => {
	app.get("/api/exercises/:id", (req, res) => {
		Exercise.find({ id: req.params.id }).then(data => {
			res.send(data);
		});
	});
	app.post("/api/exercise", requireLogin, (req, res) => {
		const { id, name, tags } = req.body;
		const exercise = new Exercise({
			id,
			name,
			tags,
		});

		try {
			exercise.save();
			res.send(exercise.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
