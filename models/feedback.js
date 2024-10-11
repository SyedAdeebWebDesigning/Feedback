const mongoose = require("mongoose");

const Feedback = new mongoose.Schema(
	{
		name: { type: String, required: true },
		contactNumber: { type: Number, required: true },
		email: { type: String, required: true },
		feedback: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Feedback", Feedback);
