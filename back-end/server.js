const express = require("express");
const cors = require('cors')
require("dotenv").config();
const app = express();
const connectDB = require("./src/config/mongo");

const PORT = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// import routers
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");

// use routers
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    connectDB();
});

module.exports = app
