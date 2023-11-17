const mongoose = require('mongoose');
const connect = async () => {
    await mongoose.connect(process.env.MONGO_STRING).catch((e) => console.error('Connection To Database Failed'));
    return mongoose
}
module.exports = {
    connect,
}