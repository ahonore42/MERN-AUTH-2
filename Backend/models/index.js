const mongoose = require('mongoose')

// MONGO DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

// MONGOOSE CONNECTION OBJECT
const db = mongoose.connection

// SET UP EVENT LISTENTER TO FIRE ONCE WHEN THE CONNECTION 'OPENS'
// console.log what host and port are being used
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (err) => {
    console.log(`Database error: ${err}`)
})

module.exports.User = require('./User')