const mongoose = require("mongoose");
const { Schema } = mongoose;

const devlogSchema = new Schema({
	duration: Number,
});

mongoose.model("devlog", devlogSchema);
