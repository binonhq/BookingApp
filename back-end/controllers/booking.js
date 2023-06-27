const bookingService = require("../services/booking");

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.json({ data: bookings, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBooking = async (req, res) => {
    try {
        const booking = await bookingService.addBooking(req.body);
        res.json({ _id: booking._id, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        res.json({ data: booking, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await bookingService.updateBooking(req.params.id, req.body);
        res.json({ data: booking, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await bookingService.deleteBooking(req.params.id);
        res.json({ data: booking, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
