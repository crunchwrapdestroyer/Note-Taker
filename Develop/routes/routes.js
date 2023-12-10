const { error } = require('console')
const fs = require('fs')
const path = require('path')
const router = require('express').Router()

//Set up /api/notes GET route
router.get('/api/notes', (req, res) => {
    // const noteId = req.params.id
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        if (err) throw err
        console.error(err)
        const notes = JSON.parse(data)
        // const foundNote = notes.find(note => note.id === parseInt(noteId))
        res.json(notes)
    })
})
    
//Set up * GET route for index.html
        
//Set up /api/notes POST route
router.post('/api/notes', (req, res) => {
    const newNote = req.body
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error'})
            return;
        }
        const parsedData = JSON.parse(data)
        parsedData.push(newNote)
        console.log (parsedData)
        const stringData = JSON.stringify(parsedData)
        fs.writeFile(path.join(__dirname, '../db/db.json'), stringData, (err) => {
        })    
        res.json(newNote)
        console.log('Added new note: ' + newNote.title)
    })
    
        // res.json(newNote)
        console.log('Added  new note: ' + newNote.title)
    })

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
router.get('/api/notes:id', (req, res) => {
    
})
module.exports = router

//Delete note of specific ID
//Create /api/notes GET route to notes.html
//