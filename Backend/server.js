require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const passport = require('passport')

// MIDDLEWARE FOR SERVER
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ENTRY POINT FOR SERVER
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, from the backend 🍑'})
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`☕️ You're listening to the smooth sounds of port ${process.env.PORT || 8000} 🦾, clean servers go brrr`)
})