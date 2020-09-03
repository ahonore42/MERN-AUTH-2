require('dotenv').config()

// PASSPORT STRATEGY FOR JWT AUTHENTICATION
// This allows authentication of endpoints using json web tokens
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

const User = mongoose.model('User')

// SETTING JWT OPTIONS
// Object literal containing options to control
// Controls how tokens are extracted from requests or verified
const options = {}
// jwtFromRequest REQUIRED function that accepts a request as the
// only parameter and returns either the JWT as a string or null
// fromAuthHeaderAsBearerToken() creates an extractor that looks for the JWT in the auth header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET




module.exports = (passport) => {
    passport.use(new jwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        // jwt_payload is an object literal containing the decoded JWT payload
        // done is a passport callback that has error first as an argument done(error, user/info)
        .then(user => {
            if (user) {
                // IF USER FOUND, RETURN null [for error] and user
                return done(null, user)
            }
            else {
                // IF NO USER IS FOUND
                return done(null, false)
            }
        })
        .catch(err => { console.log('Passport ERROR: ', err)})
    }))
}