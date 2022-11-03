const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const carSchema = new Schema({
    make: String,
    model: String,
    package: String,
    color: String,
    year: Number,
    category: String,
    mileage: Number,
    price: Number,
    carId: String,
    img: String
})

const Car = model("Car", carSchema)
module.exports = Car;