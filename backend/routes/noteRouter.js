const express = require('express');
const router = express.Router();
const notesHandler = require('../controllers/notesHandler');

router.get('/get', notesHandler.noteFetcher);
router.post('/post', notesHandler.noteAdder);
router.put('/put', notesHandler.noteEditor);
router.delete('/delete', notesHandler.noteDeleter);


module.exports = router;