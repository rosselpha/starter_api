const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PoolSchema = new Schema({

    participant_post_link: {
        type:String
    },
    likes_count: Number,
    date: Date,
})
module.exports = mongoose.model('pool', PoolSchema) 