const mongoose = require("mongoose");
const { Schema } = mongoose;

const coursenoteSchema = new Schema({
	title: String,
	slug: String,
	tags: [{ type: String }],
	content: String,
	courselink: String,
	lecturer: String,
	published: Number,
	lastEdit: Number,
});

mongoose.model("coursenote", coursenoteSchema);
