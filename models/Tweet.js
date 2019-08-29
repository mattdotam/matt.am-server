const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema({
	id: Number,
	string: String,
	timestamp: Number,
});

mongoose.model("tweet", tweetSchema);
