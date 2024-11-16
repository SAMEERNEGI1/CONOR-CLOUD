const express = require('express')
const fetchuser = require('../middleware/fetchUser')
const router = express.Router()
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator')



//route-1- get all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")

    }

})
//route-2 - adding notes
router.post('/addnotes', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'write some description for your notes').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save()


        res.json(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")

    }

})

//route-3 updating notes..
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }

        if (tag) {
            newNote.tag = tag
        }

        //find a note to update
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not authorised")

        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({note})


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")

    }
})

//route-4 - deleting notes

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        

        //find a note to delete
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }

        //delete if user owns it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not authorised")

        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success": "note has been deleted", note:note})


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")

    }
})


module.exports = router
