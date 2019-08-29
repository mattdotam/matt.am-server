const mongoose = require("mongoose");
const { Schema } = mongoose;

const weighSchema = new Schema({
	weight: Number,
	timestamp: Number,
});

mongoose.model("weigh", weighSchema);
