const express = require('express');
const app = express();
const path = require('path');
const PORT = 3500;


app.use(express.json());
app.use('/noteHandler', require('./routes/noteRouter'));

app.get('/home', (req, res) =>{
    res.send("Server home")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});