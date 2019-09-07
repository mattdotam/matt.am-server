const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
	id: String,
	name: String,
	tags: ["String"],
});

mongoose.model("exercise", exerciseSchema);
