const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutSchema = new Schema({
	timestamp: Number,
	id: String,
	activities: [
		{
			name: String,
			tags: [String],
			comment: String,
			distance: Number,
			duration: Number,
			sets: [
				{
					reps: Number,
					weight: Number,
				},
			],
		},
	],
});

mongoose.model("workout", workoutSchema);
