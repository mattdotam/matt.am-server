const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Supplement = mongoose.model("supplement");

module.exports = app => {
	app.get("/api/supplements/:id", (req, res) => {
		Supplement.find({ id: req.params.id }).then(data => {
			res.send(data);
		});
	});
	app.post("/api/supplements", requireLogin, (req, res) => {
		const { id, timestamp, name, unit, quantity } = req.body;
		const supplement = new Supplement({
			timestamp,
			id,
			name,
			unit,
			quantity,
		});
		try {
			supplement.save();
			res.send(supplement.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
