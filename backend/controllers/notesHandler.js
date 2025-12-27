const { logMake } = require('../middleware/logEvents');

const noteFetcher = async (req, res) => {
    logMake(req, res);
}

const noteAdder = async (req, res) => {
    res.send('Adding Notes');
}
const noteDeleter = async (req, res) => {
    res.send('Deleting Notes');
}

const noteEditor = async (req, res) => {
    res.send('Editing Notes');
}
module.exports = { noteFetcher, noteAdder, noteDeleter, noteEditor };