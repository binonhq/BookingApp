const BookingModel = require("../models/booking");

exports.getAllBookings = async () => {
    return await BookingModel.find({});
}

exports.addBooking = async (booking) => {
    return await BookingModel.create(booking);
}

exports.getBookingById = async (id) => {
    return await BookingModel.findById(id);
}

exports.updateBooking = async (id, booking) => {
    return await BookingModel.findByIdAndUpdate(id, booking);
}

exports.deleteBooking = async (id) => {
    return await BookingModel.findByIdAndDelete(id);
}
