const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Meal = mongoose.model("meal");

module.exports = app => {
	app.get("/api/meals/:id", (req, res) => {
		Meal.find({ id: req.params.id }).then(data => {
			res.send(data);
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
					energy: f.fibre,
				};
			}),
		});
		try {
			meal.save();
			res.send(meal.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
