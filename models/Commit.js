const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for commits
const commitSchema = new Schema({
	netloc: Number,
	loc: {
		total: Number,
		additions: Number,
		deletions: Number,
	},
	hash: String,
	timestamp: Number,
	subject: String,
	project: String,
	url: String,
});

// Tying Schema to users collection
mongoose.model("commit", commitSchema);
