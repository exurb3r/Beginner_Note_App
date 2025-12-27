const { format } = require('date-fns');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


const logMake = async (req, res) => {
    const date = `${format(new Date(), 'yyyyMMdd\tHH::mm:ss')}`;
    const {name, message} = req.body;
    

    const log = `At ${date}, ${name} have sent this message: ${message}`;
    res.send(log);
}


module.exports = { logMake }