require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'awuichaiuwchasasdwd123';

app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static(__dirname + "\\uploads\\"))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

const URL = 'mongodb+srv://admin:admin123@booking.wku5jbx.mongodb.net/';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const userDoc = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const checkPass = bcrypt.compareSync(password, userDoc.password);
        if (checkPass) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) {
                    throw err;
                }
                res.cookie('token', token).json(userDoc);
            })
        }
        else {
            res.status(422).json("Pass NOT OK");
        }
    } else {
        res.status(422).json('Not found account');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) {
                throw err;
            }
            res.json(user)
        })
    } else res.json(null)
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/test', (req, res) => {
    res.json('ok')
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + "\\uploads\\" + newName,
    })
    res.json(newName);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhoto, description,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhoto, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        })
        res.json(placeDoc)
    })
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhoto, description,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    const placeDoc = await Place.findById(id);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhoto, description,
                perks, extraInfo, checkIn, checkOut, maxGuests
            });
            await placeDoc.save();
        }
        res.json("ok")
    })
});

app.get('/places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params
    res.json(await Place.findById(id));
})

module.exports = app;
