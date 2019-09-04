const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplementRefSchema = new Schema({
	name: String,
	unit: String,
});

mongoose.model("supplementRef", supplementRefSchema);
