const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

const dbJSON = require('./db/db.json')
const routes = require('./routes/routes')


// Install middleware
app.use(express.json)
app.use(express.urlencoded({ extended: true }));
app.use(routes)
//Start server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})