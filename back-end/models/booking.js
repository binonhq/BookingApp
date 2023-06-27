const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookingSchema = new Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "place",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: Number,
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = BookingModel;
