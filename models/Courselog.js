const mongoose = require("mongoose");
const { Schema } = mongoose;

const courselogSchema = new Schema({
	duration: Number,
	timestamp: Number,
});

mongoose.model("courselog", courselogSchema);
