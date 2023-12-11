// Import necessary modules
const { error } = require('console')
const fs = require('fs')
const path = require('path')
const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')

//Set up /api/notes GET route
router.get('/api/notes', (req, res) => {
 // Read the contents of db.json file
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
    // Handle file read error
        if (err) throw err
        console.error(err)
        // Parse the JSON data
        const notes = JSON.parse(data)
        // Generate a new UUID
        const newUuID = uuidv4
        // Map each note to include a new UUID
        const notesWithUuid = notes.map(note => ({
            ...note,
            id: uuidv4(),
        }))
        // Send the notes with UUID as JSON response
        res.json(notesWithUuid)
    })
})


//Set up /api/notes POST route
router.post('/api/notes', (req, res) => {
    // Create a new note with a UUID
    const newNote = {
        ...req.body,
        id: uuidv4()
    }
    // Read the contents of db.json file
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        // Send internal server error response
        if (err) {
            res.status(500).json({ error: 'Internal Server Error'})
            return;
        }
        // Parse the JSON data
        const parsedData = JSON.parse(data)
        console.log(parsedData)
        // Add the new note to the parsed data
        parsedData.push(newNote)
        console.log('Parsed Data after pushing new note:', parsedData);

        console.log (parsedData)
        // Stringify the updated data
        const stringData = JSON.stringify(parsedData)
         // Write the updated data back to db.json file
        fs.writeFile(path.join(__dirname, '../db/db.json'), stringData, (err) => {
        })    
         // Send the updated data as JSON response
        res.json(parsedData)
        console.log('Added new note: ' + newNote.title)
    })
    })
// Set up /api/notes DELETE route
router.delete('/api/notes/:id', (req, res) => {
    // Read the contents of db.json file
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        // Handle file read error
        if (err) {
            console.error(err)
            // Send internal server error response
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
         // Parse the JSON data
        const parsedData = JSON.parse(data)
        console.log(parsedData)
        // Find the index of the note with the specified ID
        const noteIndex = parsedData.findIndex(note => note.id === req.params.id)

        // Remove note from the array
        parsedData.splice(noteIndex, 1) 
        // Write updated data back to the file
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedData), (err) => {
            // Handle file write error
            if (err) {
                console.error(err)
                // Send internal server error response
                res.status(500).json({ error: 'Internal Server Error' })
                return
            }
            // Send success response
            res.json ({ success: true })
            console.log('Deleted note with ID: ' + req.params.id)
        })
    })
})    
// Set up root route
router.get('/', (req, res) => {
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
// Set up /notes route
router.get('/notes', (req, res) => {
    // Send the notes.html file as the response
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
// Set up /api/notes:id route
router.get('/api/notes:id', (req, res) => {
    // Send the note with the specified ID as JSON response
    res.json(notes[req.params.id])
})
// Export the router
module.exports = router
