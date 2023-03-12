const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String, required: true },
        
      
    },
    { timestamps: true });
module.exports = mongoose.model('ImageURL', imageSchema);