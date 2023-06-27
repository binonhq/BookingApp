const express = require("express");
const {
    getAllBookings,
    addBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
} = require("../controllers/booking");
const router = express.Router();

router.route("/").get(getAllBookings).post(addBooking);
router.route("/:id").get(getBookingById).put(updateBooking).delete(deleteBooking);

module.exports = router;
