const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Coursenote = mongoose.model("coursenote");

module.exports = app => {
	app.get("/api/coursenotes", (req, res) => {
		Coursenote.find({}).then(data => {
			let results = [];
			data.forEach(r =>
				results.push({
					id: r.id,
					title: r.title,
					slug: r.slug,
					published: r.published,
					lecturer: r.lecturer,
					audience: r.audience,
				})
			);
			res.send(results);
		});
	});
	app.get("/api/coursenotes/:slug", (req, res) => {
		Coursenote.find({ slug: req.params.slug }).then(data => {
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
			lecturerTwitter,
			published,
			lastEdit,
			audience,
		} = req.body;
		const coursenote = new Coursenote({
			id,
			title,
			slug,
			tags,
			content,
			courselink,
			lecturer,
			lecturerTwitter,
			published,
			lastEdit,
			audience,
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
			lecturerTwitter,
			published,
			lastEdit,
			audience,
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
				lecturerTwitter,
				published,
				lastEdit,
				audience,
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
