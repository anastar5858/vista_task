const mongoose = require('mongoose');
const requestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    // for the web scraping propose feature
    picture: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})
const requests = mongoose.model('requests', requestSchema);
module.exports = {
    requests,
}