require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWT_SECRET = process.env.JWT_SECRET

// LOAD USER MODEL
const User = require('../../models/User')

// GET api/users/test (Public Route)
router.get('/test', (req, res) => {
    res.json({ message: 'User endpoint working'})
})

// POST api/users/register (Public)
router.post('/register', (req, res) => {
    // Find user by email
    User.findOne({email: req.body.email})
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

module.exports = router