const Notes = require('../models/Notes');
const { logMake, logGet } = require('../middleware/logEvents');

const noteFetcher = async (req, res) => {
    const { username } = req.body
    if (!username) return res.status(400).json({message: "Needs username"});
    const notes = await Notes.findOne({username});
    if (!notes) return res.status(404).json({'message': 'user does not exists'});
    res.json(notes);
}

const noteAdder = async (req, res) => {
    try{
        const {username, title, description} = req.body;
        if(!username || !title || !description) return res.status(400).json({message: "All credentials are required"})
        const notes = await Notes.findOneAndUpdate(
            {username},
            {
                $push:{
                    notes:{
                        title: title,
                        date: new Date(),
                        description: description
                    }
                }
            },
            { new: true} // to return this updated?
        );

        if (!notes) return res.status(404).json({'message': 'user does not exist'});

        res.status(200).json(notes);
    
    } catch (err){
        console.error(err);
        res.status(500).json({ message: err.message});
    }
}

const noteDeleter = async (req, res) => {
    try{
        const {username, noteId} = req.body;
        if(!username || !noteId) return res.status(400).json({message: "All credentials are required"})
        const notes = await Notes.findOneAndUpdate(
            { username },
            { $pull: {notes: {_id: noteId} } },
            { new: true} // to return this updated?
        );
        
        if (!notes) return res.status(404).json({'message': 'user does not exists'});
        res.status(200).json(notes);
    
    } catch (err){
        console.error(err);
        res.status(500).json({ message: err.message});
    }
}

const noteEditor = async (req, res) => {
    try{
        const { username, noteId, title, description } = req.body;
        if(!username || !noteId || !title || !description) return res.status(400).json({message: "All credentials are required"})
        const notes = await Notes.findOneAndUpdate(
            { username, "notes._id": noteId },
            {
                $set: {
                    "notes.$.title": title,
                    "notes.$.description": description
                }
            },
            { new: true }
        );

        if (!notes) return res.status(404).json({'message': 'user does not exists'});

        res.status(200).json(notes)

    } catch (err){
        res.status(500).json({ message: err.message})
    }
}
module.exports = { noteFetcher, noteAdder, noteDeleter, noteEditor };