const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Food = mongoose.model("food");

module.exports = app => {
	app.get("/api/foods", (req, res) => {
		Food.find({}).then(data => {
			let results = [];
			data.forEach(r => results.push({ name: r.name, id: r.id }));
			res.status(200).send(results);
		});
	});
	app.get("/api/foods/:id", (req, res) => {
		Food.find({
			id: `${req.params.id}`,
		}).then(data => {
			res.status(200).send(data);
		});
	});
	app.post("/api/foods", requireLogin, (req, res) => {
		const {
			id,
			name,
			baseQuantity,
			baseUnit,
			protein,
			fat,
			carbs,
			fibre,
			energy,
			tags,
			serves,
		} = req.body;
		const food = new Food({
			id,
			name,
			baseQuantity,
			baseUnit,
			protein,
			fat,
			carbs,
			fibre,
			energy,
			tags,
			serves: serves.map(s => {
				return {
					name: s.name,
					multiplier: s.multiplier,
				};
			}),
		});
		try {
			food.save();
			res.status(201).send(food.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/foods", requireLogin, (req, res) => {
		const {
			id,
			name,
			baseQuantity,
			baseUnit,
			protein,
			fat,
			carbs,
			fibre,
			energy,
			tags,
			serves,
		} = req.body;
		Food.update(
			{ id: id },
			{
				name,
				baseQuantity,
				baseUnit,
				protein,
				fat,
				carbs,
				fibre,
				energy,
				tags,
				serves: serves.map(s => {
					return {
						name: s.name,
						multiplier: s.multiplier,
					};
				}),
			}
		).then(data => {
			res.status(200).send(data);
		});
	});
	app.delete("/api/foods/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Food.deleteOne({ id: id }, err => {
			res.send(err);
		}).then(res => {
			res.status(200).send(res);
		});
	});
};
