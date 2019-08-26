const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for users
const userSchema = new Schema({
	googleId: String,
});

// Tying Schema to users collection
mongoose.model("user", userSchema);
