const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser =  require('../middleware/fetchuser');

const JWT_SECRET = 'sony:viao-is.slow';

// ROUTE 1: Get All the Notes using: GET "/api/auth/createuser". Login required
router.post('/createuser', [
    body('name', 'not valid').isLength({ min: 3 }),
    body('password', 'not strong').isLength({ min: 6 })
], async (req, res) => {

    let success = false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ error: "user exist with this email" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("some error occured");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/login', [
    body('email', 'not valid').isLength({ min: 3 }),
    body('password', 'must enter').exists(),
], async (req, res) => {
    let success = false;

    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "enter with right credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})

// Routes 3
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;