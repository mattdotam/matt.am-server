const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Supplement = mongoose.model("supplement");

module.exports = app => {
	app.get("/api/supplements/", (req, res) => {
		Supplement.find({}).then(data => {
			let results = [];
			data.forEach(r =>
				results.push({ id: r.id, timestamp: r.timestamp })
			);
			res.status(200).send(results);
		});
	});
	app.get("/api/supplements/:id", (req, res) => {
		Supplement.find({ id: req.params.id }).then(data => {
			res.status(200).send(data);
		});
	});
	app.post("/api/supplements", requireLogin, (req, res) => {
		const { id, timestamp, name, unit, quantity } = req.body;
		const supplement = new Supplement({
			id,
			timestamp,
			name,
			unit,
			quantity,
		});
		try {
			supplement.save();
			res.status(201).send(supplement.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/supplements", requireLogin, (req, res) => {
		const { id, timestamp, name, unit, quantity } = req.body;
		Supplement.update(
			{ id },
			{ timestamp, name, unit, quantity }
		).then(data => {
			res.status(200).send(data);
		});
	});
	app.delete("/api/supplements/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Supplement.deleteOne({ id }, err => {
			res.send(err);
		}).then(res => {
			res.status(200).send(res);
		});
	});
};
