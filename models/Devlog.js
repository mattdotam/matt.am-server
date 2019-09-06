const mongoose = require("mongoose");
const { Schema } = mongoose;

const devlogSchema = new Schema({
	date: String,
	rows: [[String, Number, Number, String]],
});

mongoose.model("devlog", devlogSchema);
