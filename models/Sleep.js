const mongoose = require("mongoose");
const { Schema } = mongoose;

const sleepSchema = new Schema({
	id: Number,
	from: Number,
	to: Number,
	hours: Number,
});

mongoose.model("sleep", sleepSchema);
