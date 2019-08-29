const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
	title: String,
	link: String,
	id: String,
	tags: [{ type: String }],
	published: Number,
});

mongoose.model("video", videoSchema);
