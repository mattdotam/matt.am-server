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
	published: Number,
	lastEdit: Number,
});

mongoose.model("coursenote", coursenoteSchema);
