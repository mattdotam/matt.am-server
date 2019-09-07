const mongoose = require("mongoose");
const { Schema } = mongoose;

const coursenoteSchema = new Schema({
	id: String,
	title: String,
	slug: String,
	tags: [String],
	content: String,
	courselink: String,
	lecturer: String,
	lecturerTwitter: String,
	published: Number,
	lastEdit: Number,
	audience: String,
});

mongoose.model("coursenote", coursenoteSchema);
