const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
	title: String,
	slug: String,
	tags: [{ type: String }],
	content: String,
	published: Number,
	lastEdit: Number,
});

mongoose.model("article", articleSchema);
