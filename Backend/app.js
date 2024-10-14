const express = require("express");
const app = express();
const Sagar = require('./Model/Schema');  // Correct import for the model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  // Add the missing import for JWT
require("./connection/db");  // Make sure this path is correct for your DB connection
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

const JWT_SECRET = "your_jwt_secret_key";  // Define your JWT secret key

// Registration Endpoint
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new Sagar({ ...req.body, password: hashedPassword });

        let result = await userData.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const user = await Sagar.findOne({ email: email });

        if (!user) {
            return res.status(400).send({ message: "E-mail not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ message: "Password does not match" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        // Send the token to the client along with a success message
        res.status(200).send({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(401).send({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid Token" });
    }
};

// Protected route
app.get("/protected", verifyToken, (req, res) => {
    res.status(200).send({ message: "This is a protected route", user: req.user });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
