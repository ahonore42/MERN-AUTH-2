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
router.get('/', (req, res) => {
    res.json({ message: 'User endpoint working'})
})

module.exports = router