const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema({
	id: String,
	name: String,
	baseQuantity: Number,
	baseUnit: String,
	protein: Number,
	fat: Number,
	carbs: Number,
	fibre: Number,
	energy: Number,
	tags: [String],
	serves: [
		{
			name: String,
			multiplier: Number,
		},
	],
});

mongoose.model("food", foodSchema);
