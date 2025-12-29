const Notes = require('../models/Notes');
const { logMake, errorLog} = require('../middleware/logEvents');

const noteFetcher = async (req, res) => {
    try{
        const { username } = req.query;

        if (!username) return res.status(400).json({message: "Needs username"});
        const notes = await Notes.findOne({username});
        if (!notes) return res.status(404).json({'message': 'user does not exists'});

        res.json(notes);
        logMake({username}, "Fetched Notes");

    } catch (err) {
        res.status(500).json({ message: err.message});
        errorLog(err.message);
    }
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
        logMake({username}, "Added Notes");
    
    } catch (err){
        res.status(500).json({ message: err.message});
        errorLog(err.message);
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
        logMake({username}, "Deleted Notes");
    
    } catch (err){
        res.status(500).json({ message: err.message});
        errorLog(err.message);
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
                    "notes.$.description": description,
                    "notes.$.date": new Date()
                }
            },
            { new: true }
        );
        if (!notes) return res.status(404).json({'message': 'user does not exists'});

        res.status(200).json(notes);
        logMake({username}, "Edited Notes");

    } catch (err){
        res.status(500).json({ message: err.message});
        errorLog(err.message);
    }
}
module.exports = { noteFetcher, noteAdder, noteDeleter, noteEditor };