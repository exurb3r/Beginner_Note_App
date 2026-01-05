const User = require('../models/Users');

const addUser = async(req, res) => {
    try{
        const {username, password} = req.body;
        
        if(!username || !password) return res.status(400).json({message: "All credentials are required"});

        const newUser = await User.findOne({username});

        if(newUser) return res.status(400).json({message: "User already Exists"});
        const addNewUser = await User.create({
            username: username,
            password: password
        })

        res.status(200).json(addNewUser);


    } catch (err) {
        res.status(500).json({ message: err.message});
        console.error(err);
    }
}

module.exports = {addUser};