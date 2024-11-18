require('dotenv').config()
const mongoose = require('mongoose');
exports.connectMonggose =()=>{
    mongoose.connect(process.env.Database_URL)
    .then(()=>{
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err)=>{
        console.error('Connection error', err);
    })
}
