const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
	id: String,
	timestamp: Number,
	food: [
		{
			name: String,
			quantity: Number,
			unit: String,
			protein: Number,
			fat: Number,
			carbs: Number,
			fibre: Number,
			energy: Number,
		},
	],
});

mongoose.model("meal", mealSchema);
