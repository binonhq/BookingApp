const express = require("express");
const cors = require('cors')
require("dotenv").config();
const app = express();
const connectDB = require("./config/mongo");

const PORT = process.env.PORT;
app.use(express.json());
app.use('/uploads', express.static(__dirname + "\\uploads\\"))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// import routers
const userRouter = require("./routes/user");
const placeRouter = require("./routes/place");
const bookingRouter = require("./routes/booking");

// use routers
app.use("/api/user", userRouter);
app.use("/api/place", placeRouter);
app.use("/api/booking", bookingRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    connectDB();
});

module.exports = app
