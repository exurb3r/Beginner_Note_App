const express = require('express');
const router = express.Router();
const notesHandler = require('../controllers/notesHandler');

router.get('/get', notesHandler.noteFetcher);
router.get('/delete', notesHandler.noteDeleter);
router.get('/put', notesHandler.noteEditor);
router.get('/post', notesHandler.noteAdder);

module.exports = router