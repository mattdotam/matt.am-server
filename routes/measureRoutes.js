const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Measure = mongoose.model("measure");

module.exports = app => {
	app.get("/api/measures/", (req, res) => {
		Measure.find({}).then(data => {
			let results = [];
			data.forEach(r =>
				results.push({ id: r.id, timestamp: r.timestamp })
			);
			res.status(200).send(results);
		});
	});
	app.get("/api/measures/:id", (req, res) => {
		Measure.find({ id: req.params.id }).then(data => {
			res.status(200).send(data);
		});
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
			bodyfat: m.bodyfat,
		});
		try {
			measure.save();
			res.status(201).send(measure.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/measures", requireLogin, (req, res) => {
		const m = req.body;
		Measure.update(
			{ id: m.id },
			{
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
				bodyfat: m.bodyfat,
			}
		).then(data => {
			res.status(200).send(data);
		});
	});
	app.delete("/api/measures/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Measure.deleteOne({ id }, err => {
			res.send(err);
		}).then(res => {
			res.status(200).send(res);
		});
	});
};
