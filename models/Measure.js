const mongoose = require("mongoose");
const { Schema } = mongoose;

const measureSchema = new Schema({
	height: Number,
	neck: Number,
	chest: Number,
	waist: Number,
	belly: Number,
	hips: Number,
	bicepL: Number,
	bicepR: Number,
	forearmL: Number,
	forearmR: Number,
	thighL: Number,
	thighR: Number,
	calfL: Number,
	calfR: Number,
	mmol: Number,
	timestamp: Number,
});

mongoose.model("measure", measureSchema);