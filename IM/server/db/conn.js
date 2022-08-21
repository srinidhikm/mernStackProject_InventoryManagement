const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DB = process.env.DATABASE;

mongoose.connect(DB).then( () =>
{
    console.log('DB connected');
}).catch( (err) => console.log('DB not connected'));