const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../utils/validation");
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/user');

// router.post('/register', async (req, res) => {
//     const { error } = registerValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: hashedPassword,
//         email: req.body.email
//     });

//     try {
//         await user.save();
//         res.send({ id: user._id });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });
router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    const salt = await bcrypt.genSalt(10);
    try {
        const userDoc = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});
// router.post('/login', async (req, res) => {
//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     const{email, password} = req.body;
//     const user = await User.findOne({email: email});
//     if (!user) return res.status(400).send("account not found");

//     const validPassword = await bcrypt.compare(password, user['password']);
//     if (!validPassword) return res.status(400).send("invalid password");

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.header('TOKEN', token).send(token);
// });
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email:email });
    if (userDoc) {
        const checkPass = bcrypt.compareSync(password, userDoc.password);
        if (checkPass) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET, {}, (err, token) => {
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

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
