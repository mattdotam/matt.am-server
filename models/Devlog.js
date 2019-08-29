const mongoose = require("mongoose");
const { Schema } = mongoose;

const devlogSchema = new Schema({
	duration: Number,
	timestamp: Number,
});

mongoose.model("devlog", devlogSchema);