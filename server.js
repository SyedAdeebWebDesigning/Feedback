require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("./models/feedback.js");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

const mongooseUri = process.env.MONGODB_URI;

mongoose
	.connect(mongooseUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});
app.post("/submit-feedback", async (req, res) => {
	try {
		const newFeedback = new Feedback(req.body);
		await newFeedback.save();
		res.status(201).send(`
        <html>
            <head>
                <title>Feedback Submitted</title>
            </head>
            <body>
                <h1>Feedback Submitted</h1>
                <p>Thank you for your feedback!</p>
            </body>
        </html>`);
	} catch (error) {
		res.status(500).send("Error saving feedback: " + error.message);
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
