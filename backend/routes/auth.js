const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser=require('../middleware/fetchUser')

const JWT_SECRET = 'ILoveOwlCity'


const { body, validationResult } = require('express-validator')

//route-1 creating a user using post "/api/auth/createUser"
router.post('/createUser', [
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'password must be minimum 3 letters').isLength({ min: 5 })
], async (req, res) => {
    let success=false;

    //if errors return bad errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    //checking user email exist already
    try {


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "sorry user already exists with this email" })
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10)

        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,

        })
        //jwt authentication
        const data = {
            user: {
                id: user.id,
            }

        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success=true
        res.json({ success, authToken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured");
    }
})

//route 2 - creating login setup
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    //body('name', 'enter a valid name').isLength({min:3}),
    body('password', 'password cannot be blanked').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //destructuring email and pass form req . body
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success=false
            return res.status(400).json({success, error: "Wrong credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success=false
            return res.status(400).json({ success, error: "Wrong credentials" })

        }
        else {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success=true;
            res.json({ success,authToken })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured");
    }
})

//route 3- get loged in user details
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const userId=req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured")

    }
})


module.exports = router
