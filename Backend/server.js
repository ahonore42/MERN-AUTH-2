require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const passport = require('passport')

const users = require('./routes/api/users')

// MIDDLEWARE FOR SERVER
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
require('./config/passport')(passport)


// ENTRY POINT FOR SERVER
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, from the backend 🍑'})
})

app.use('/api/users/', users)

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`☕️ You're listening to the smooth sounds of port ${process.env.PORT || 8000} 🦾, clean servers go brrr`)
})