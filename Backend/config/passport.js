require('dotenv').config()

// PASSPORT STRATEGY FOR JWT AUTHENTICATION
// This allows authentication of endpoints using json web tokens
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

// SETTING JWT OPTIONS
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET



const User = mongoose.model('User')

module.exports = (passport) => {
    passport.use(new jwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
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