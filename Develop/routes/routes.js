const { error } = require('console')
const fs = require('fs')
const path = require('path')
const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')

//Set up /api/notes GET route
router.get('/api/notes', (req, res) => {

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        if (err) throw err
        console.error(err)
        const notes = JSON.parse(data)

        const newUuID = uuidv4
        const notesWithUuid = notes.map(note => ({
            ...note,
            id: uuidv4(),
        }))
        res.json(notesWithUuid)
    })
})

//Set up * GET route for index.html

//Set up /api/notes POST route
router.post('/api/notes', (req, res) => {
    const newNote = {
        ...req.body,
        id: uuidv4()
    }
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error'})
            return;
        }
        const parsedData = JSON.parse(data)
        console.log(parsedData)
        parsedData.push(newNote)
        console.log('Parsed Data after pushing new note:', parsedData);

        console.log (parsedData)
        const stringData = JSON.stringify(parsedData)
        
        fs.writeFile(path.join(__dirname, '../db/db.json'), stringData, (err) => {
        })    
        res.json(parsedData)
        console.log('Added new note: ' + newNote.title)
    })
    })

router.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const parsedData = JSON.parse(data)
        const noteIndex = parsedData.findIndex(note => note.id === req.params.id)

        if (noteIndex === -1) {
            res.status(404).json({ error: 'Note not found' })
            return
        }
        // Remove note from the array
        parsedData.splice(noteIndex, 1) 
        // Write updated data back to the file
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedData), (err) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Internal Server Error' })
                return
            }
            res.json ({ success: true })
            console.log('Deleted note with ID: ' + req.params.id)
        })
    })
})    

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
router.get('/api/notes:id', (req, res) => {
    res.json(notes[req.params.id])
})
module.exports = router

//Delete note of specific ID
//Create /api/notes GET route to notes.html
//