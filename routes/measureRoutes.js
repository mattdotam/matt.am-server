const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Measure = mongoose.model("measure");

module.exports = app => {
	app.get("/api/measures/:id", (req, res) => {
		Measure.find({ id: req.params.id }).then(data => {
			res.send(data);
		});
	app.post("/api/measures", requireLogin, (req, res) => {
		const m = req.body;
		const measure = new Measure({
			id: m.id,
			timestamp: m.timestamp,
			height: m.height,
			weight: m.weight,
			neck: m.neck,
			chest: m.chest,
			waist: m.waist,
			belly: m.belly,
			hips: m.hips,
			bicepL: m.bicepL,
			bicepR: m.bicepR,
			forearmL: m.forearmL,
			forearmR: m.forearmR,
			thighL: m.thighL,
			thighR: m.thighR,
			calfL: m.calfL,
			calfR: m.calfR,
			mmol: m.mmol,
		});

		try {
			measure.save();
			res.send(measure.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
