const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Food = mongoose.model("food");

module.exports = app => {
	app.get("/api/foods/:string", (req, res) => {
		Food.find({
			name: new RegExp(`${req.params.id}`, "i"),
		}).then(data => {
			res.send(data);
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
			res.send(food.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
