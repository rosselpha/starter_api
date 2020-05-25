const mongoose = require('mongoose')
const Schema = mongoose.Schema


const LotoSchema = new Schema({

    chalenge_post_link: {
        type:String
    },
    date: Date,
})
module.exports = mongoose.model('loto', LotoSchema) 

