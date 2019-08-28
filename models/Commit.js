const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for commits
const commitSchema = new Schema({
	netloc: Number,
	hash: String,
	timestamp: Number,
	subject: String,
	project: String,
});

// Tying Schema to users collection
mongoose.model("commit", commitSchema);
