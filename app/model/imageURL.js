require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String, required: true,
        get:(image)=>{
         // http://localhost:8000/uploads\1678602843132-545495737.jpg
            return `${process.env.APP_URL}/${image}`
        } },
        
      
    },
    { timestamps: true, toJSON: { getters: true } });
module.exports = mongoose.model('ImageURL', imageSchema);