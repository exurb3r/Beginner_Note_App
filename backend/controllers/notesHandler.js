const Notes = require('../models/Notes');
const { logMake, logGet } = require('../middleware/logEvents');

const noteFetcher = async (req, res) => {
    const notes = await Notes.findOne({username: req.body.username});
    if (!notes) return res.status(404).json({'message': 'user does not exists'});
    res.json(notes)
}

const noteAdder = async (req, res) => {
    const {name, message} = req.body;
    const confirmation = await logMake(name, message);
    if (confirmation) {
        res.send("Notes Saved Successfully");
    } else {
        res.send("Failed to save");
    }

}
const noteDeleter = async (req, res) => {
    res.send('Deleting Notes');
}

const noteEditor = async (req, res) => {
    res.send('Editing Notes');
}
module.exports = { noteFetcher, noteAdder, noteDeleter, noteEditor };