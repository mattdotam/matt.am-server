const mongoose = require("mongoose");
const { Schema } = mongoose;

const kataSchema = new Schema({
	id: String,
	name: String,
	timestamp: Number,
});

mongoose.model("kata", kataSchema);
