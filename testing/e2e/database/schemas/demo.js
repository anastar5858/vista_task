const mongoose = require('mongoose');

const demosSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    demoElements: {
        type: Array,
        required: true,
    },
})

const demos = mongoose.model('demos', demosSchema);

module.exports = {
    demos,
}