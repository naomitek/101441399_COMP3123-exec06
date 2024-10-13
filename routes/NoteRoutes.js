// replace the file name
const noteModel = require('../models/NotesModel.js');
// exported
const express = require('express');
const router = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
// make the function as asynchronous
router.post('/notes', async(req, res) => {
    // Validate request
    if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Title, Description, priority can not be empty"
        });
    }
    const allowList = ['HIGH','LOW','MEDUI'];
    if (!allowList.includes(req.body.priority)){
        return res.status(400).send({message: "Invalid priority! Please enter HIGH, LOW or MEDUIM"});
    }
    //TODO - Write your code here to save the note
    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateAdded: new Date(), 
        dateUpdated: new Date()
    });

    try{
        await note.save();
        console.log("Successfully add Note");
        res.send(note);
    }catch(err){
        res.send("<h2>Error create a new Note</h2>");
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', async(req, res) => {
    //TODO - Write your code here to returns all note
    try{
        const notes = await noteModel.find();
        if(notes == ""){return res.send("<h2>Note list is empty!</h2>")}
        res.json(notes);
    }catch(err){
        console.error('Error fetching Notes:', err);
        res.send("<h2>Error fetching note</h2>");
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', async(req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    try{
        const noteId = req.params.noteId;
        const note = await noteModel.findById(noteId);
        if(!note){return res.send("<h2>Note dosen't exist</h2>")}
        if(note == null){ return res.send("<h2>Note dosen't exist</h2>");}
        res.json(note);
    }catch(err){
        console.error('Error fetching Notes:', err);
        res.send("<h2>Error fetching note</h2>");
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.patch('/notes/:noteId', async(req, res) => {
    //TODO - Write your code here to update the note using noteid
    const note = await noteModel.findById(req.params.noteId);
    if(note == null){return res.send( "<h2>Note dosen't exist</h2>");}
    try{
        const allowList = ['HIGH','LOW','MEDUIM'];
        if (req.body.priority && !allowList.includes(req.body.priority)){
        return res.status(400).send({message: "Invalid priority! Please enter HIGH, LOW or MEDUIM"});
        }
        const note = await noteModel.findByIdAndUpdate(req.params.noteId, req.body)
        note.dateUpdated = await new Date();
        await note.save();
        console.log('Successfully Update')
        res.send(note);
    }catch(err){
        console.log('Error Updating Notes:', err)
        res.send("<h2>Error Updating Notes</h2>");
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async(req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try{
        const note = await noteModel.findByIdAndDelete(req.params.noteId)
        if(!note){return res.send("<h2>Note dosen't exist</h2>")};
        console.log('Successfully Delete')
        res.send("<h2>Note already deleted</h2>");
    }catch(err){
        console.log('Error Delete Notes:', err)
        res.send("<h2>Error Delete Notes</h2>");
    }
});

// Export the router
module.exports = router;