const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplementRefSchema = new Schema({
	id: String,
	name: String,
	unit: String,
});

mongoose.model("supplementRef", supplementRefSchema);
