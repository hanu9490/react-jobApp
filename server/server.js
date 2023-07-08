const express = require('express');
const app = express();
const port = 4001
app.use(express.json())
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sai1342:04121998%40Dob@cluster0.woilnkh.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('DB connected..')).catch(err => console.log(err))

const getEmp = require('./routes/getEmp')
const addEmp = require('./routes/addEmp')

app.use('/getemployees', getEmp)
app.use('/addemployees', addEmp)

app.listen(port, () => {
    console.log('Server is running on port :', port)
})