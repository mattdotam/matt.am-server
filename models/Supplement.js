const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplementSchema = new Schema({
	timestamp: Number,
	id: String,
	name: String,
	unit: String,
	quantity: Number,
});

mongoose.model("supplement", supplementSchema);
