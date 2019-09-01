const mongoose = require("mongoose");
const { Schema } = mongoose;

const sleepSchema = new Schema({
	fromTime: Number,
	toTime: Number,
	lengthMinutes: Number,
	rating: Number,
	deepSleep: Number,
	cycles: Number,
	timezone: String,
	noiseLevel: Number,
	tags: [String],
	actigraph: [Number],
});

mongoose.model("sleep", sleepSchema);
