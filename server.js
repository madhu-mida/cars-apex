require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 4001, DATABASE_URL } = process.env;
const connectDB = require('./config/connection')
const cors = require('cors');
const morgan = require("morgan");

const Car = require('./models/car')

// MIDDLEWARES
app.use(cors());
app.use(morgan(':method :url :status :http-version :response-time '));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Welcome")
})

app.get("/cars", async (req, res) => {
    try {
        res.json(await Car.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get("/cars/:id", async (req, res) => {
    try {
        res.json(await Car.find({ carId: req.params.id }))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post("/cars", async (req, res) => {
    try {
        console.log("Ind")
        let response = await Car.create(req.body)
        res.json(response)
        console.log(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete("/cars/:id", async (req, res) => {
    try {
        res.json(await Car.findOneAndDelete({ carId: req.params.id }))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.put("/cars/:id", async (req, res) => {
    try {
        res.json(await Car.findOneAndUpdate(
            { carId: req.params.id },
            req.body,
            { new: true }
        ))
    } catch (error) {
        res.status(400).json(error);
    }
})

const start = async () => {
    try {
        connectDB();
        app.listen(PORT, () => {
            console.log(`Server is live on PORT: ${PORT}`)
        })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

start();