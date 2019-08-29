const mongoose = require("mongoose");
const { Schema } = mongoose;

const readSchema = new Schema({
	slug: String,
	title: String,
	author: String,
	isbn: Number,
	score: Number,
	tags: [{ type: String }],
	timestamp: Number,
	notes: String,
});

mongoose.model("read", readSchema);
