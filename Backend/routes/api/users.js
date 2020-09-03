require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWT_SECRET = process.env.JWT_SECRET

// LOAD USER MODEL
const db = require('../../models')

// GET api/users/test (Public Route)
router.get('/test', (req, res) => {
    res.json({ message: 'User endpoint working'})
})

// POST api/users/register (Public)
router.post('/register', (req, res) => {
    // Find user by email
    db.User.findOne({email: req.body.email})
    .then(user => {
        // If email already exists, send a 400 response
        if (user) {
            return res.status(400).json({ message: 'Email already exists'})
        }
        else {
            // Create a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            // Salt and has passwords
            bcrypt.genSalt(12, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hashedPassword) => {
                    // change the password to the hash
                    if (error) throw error;
                    newUser.password = hashedPassword;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log('Error creating user: ', err))
                })
            })
        }
    })
})

router.post('/login', (req,res) => {
    const email = req.body.email
    const password = req.body.password

    // Find a user via email
    db.User.findOne({ email: email })
    .then(user => {
        if (!user) {
            res.status(400).json({ message: 'User not found' })
        }
        else {
            // Check password with bcrypt
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // User's password matches, send JSON web token
                    // Create a token payload (you can include anything you want)
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }

                    // Sign the token
                    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
                        res.json({ success: true, token: `Bearer: ${token}`})
                    })
                }
                else {
                    return res.status(400).json({ password: 'Password or email is incorrect' })
                }
            })
        }
    })
})

// GET api/users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})


module.exports = router