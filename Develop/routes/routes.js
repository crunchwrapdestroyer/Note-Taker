const fs = require('fs')
const path = require('path')
const router = require('express').Router()


    fs.readFile('db/db.json', 'utf8', (err,data) => {
        if (err) throw err
        const notes = JSON.parse(data)
//Set up /api/notes GET route
        router.get('/api/notes', (req, res) => {
            res.json(notes)
        })
//Set up * GET route for index.html
        
//Set up /api/notes POST route
        router.post('/api/notes', (req, res) => {
            const newNote = req.body
            const notes = JSON.parse(fs.readFile('db.json', 'utf8'))
            notes.push(newNote)
            fs.writeFile('db/db.json', JSON.stringify(notes))
            res.json(newNote)
            return console.log("Added new note: "+newNote.title)
        })
})
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router
//Retrieve note of specific ID

//Delete note of specific ID
//Create /api/notes GET route to notes.html
//