const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const hbs = require("hbs");
const Visitor = require("./models/Visitor");

dotenv.config();

const app = express();


port = process.env.PORT || 5000;

static_path = path.join(__dirname, "../public");
template_views_path = path.join(__dirname, "../templates/views");
template_partials_path = path.join(__dirname, "../templates/partials");

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_views_path);
hbs.registerPartials(template_partials_path);

// Routes
app.get("/", (req, res) => {
    res.render("index")
});

app.post("/contact", async(req, res) => {
    try {
        const visitorData = new Visitor(req.body);
        await visitorData.save();
        res.status(201).render("/");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Connecting to MongoDB 
mongoose.connect("DB_CONNECT", { useNewUrlParser:true, useUnifiedTopology: true }, () => {
    console.log("MongoDB connection established...")
})


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
