const mongoose = require("mongoose");

// Use mongoose.connect() to connect to MongoDB
mongoose.connect("mongodb+srv://sagarsharma74474:sagar123@cluster0.0eywc.mongodb.net/sagar?retryWrites=true&w=majority&appName=Cluster0", {

})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});
