const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Coursenote = mongoose.model("coursenote");

module.exports = app => {
	app.get("/api/coursenotes", (req, res) => {
		Coursenote.find({}).then(data => {
			res.send(data);
		});
	});
	app.post("/api/coursenotes", requireLogin, (req, res) => {
		const {
			id,
			title,
			slug,
			tags,
			content,
			courselink,
			lecturer,
			published,
			lastEdit,
		} = req.body;
		const coursenote = new Coursenote({
			id,
			title,
			slug,
			tags,
			content,
			courselink,
			lecturer,
			published,
			lastEdit,
		});
		try {
			coursenote.save();
			res.send(coursenote.id);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.put("/api/coursenotes", requireLogin, (req, res) => {
		const {
			id,
			title,
			slug,
			tags,
			content,
			courselink,
			lecturer,
			published,
			lastEdit,
		} = req.body;
		Coursenote.update(
			{ id: id },
			{
				title,
				slug,
				tags,
				content,
				courselink,
				lecturer,
				published,
				lastEdit,
			}
		).then(data => {
			res.send(data);
		});
	});
	app.delete("/api/coursenotes/:id", requireLogin, (req, res) => {
		const id = req.params.id;
		Coursenote.deleteOne({ id: id }, err => {
			res.send(err);
		});
	});
};
