const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const SupplementRef = mongoose.model("supplementRef");

module.exports = app => {
	app.get("/api/supplementrefs", (req, res) => {
		SupplementRef.find({}).then(data => {
			res.send(data);
		});
	});
	app.get("/api/supplementrefs/:string", (req, res) => {
		SupplementRef.find({
			name: new RegExp(`${req.params.id}`, "i"),
		}).then(data => {
			res.send(data);
		});
	});
	app.post("/api/supplementrefs", requireLogin, (req, res) => {
		const { name, unit } = req.body;
		const supplementRef = new SupplementRef({
			name,
			unit,
		});

		try {
			supplementRef.save();
			res.send(supplementRef.name);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
