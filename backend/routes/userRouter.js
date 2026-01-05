const express = require('express');
const router = express.Router();
const userHandler = require('../controllers/userHandler');

router.post('/addUser', userHandler.addUser);


module.exports = router;