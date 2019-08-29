const mongoose = require("mongoose");
const { Schema } = mongoose;

const courselogSchema = new Schema({
	duration: Number,
	timestamp: Number,
	service: String,
	course: String,
});

mongoose.model("courselog", courselogSchema);
