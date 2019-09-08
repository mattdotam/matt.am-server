const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Meal = mongoose.model("meal");

module.exports = app => {
	app.get("/api/meals/", (req, res) => {
		Meal.find({}).then(data => {
			let results = [];
			data.forEach(r =>
				results.push({ id: r.id, timestamp: r.timestamp })
			);
			res.status(200).send(results);
		});
	});
	app.get("/api/meals/:id", (req, res) => {
		Meal.find({ id: req.params.id }).then(data => {
			res.status(200).send(data);
		});
	});
	app.post("/api/meals", requireLogin, (req, res) => {
		const { id, timestamp, food } = req.body;
		const meal = new Meal({
			id,
			timestamp,
			food: food.map(f => {
				return {
					name: f.name,
					quantity: f.quantity,
					unit: f.unit,
					protein: f.protein,
					fat: f.fat,
					carbs: f.carbs,
					fibre: f.fibre,
					energy: f.energy,
				};
			}),
		});
		try {
			meal.save();
			res.status(201).send(meal.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/meals", requireLogin, (req, res) => {
		const { id, timestamp } = req.body;
		const food = req.body.food.map(f => {
			return {
				name: f.name,
				quantity: f.quantity,
				unit: f.unit,
				protein: f.protein,
				fat: f.fat,
				carbs: f.carbs,
				fibre: f.fibre,
				energy: f.energy,
			};
		});
		Meal.update(
			{ id },
			{
				timestamp,
				food: food.map(f => {
					return {
						name: f.name,
						quantity: f.quantity,
						unit: f.unit,
						protein: f.protein,
						fat: f.fat,
						carbs: f.carbs,
						fibre: f.fibre,
						energy: f.energy,
					};
				}),
			}
		).then(data => {
			res.status(200).send(data);
		});
	});
	app.delete("/api/meal/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Meal.deleteOne({ id }, err => {
			res.send(err);
		}).then(res => {
			res.status(200).send(res);
		});
	});
};
