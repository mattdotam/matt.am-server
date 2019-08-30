const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema({
	id: String,
	text: String,
	timestamp: Number,
	tags: [{ type: String }],
});

mongoose.model("tweet", tweetSchema);
