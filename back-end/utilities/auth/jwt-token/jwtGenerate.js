const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const options = {
    expiresIn: "1h",
}
const generateToken = async (payload) => {
    try {
        console.log(payload, options)
        const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
        return token;
    } catch (e) {
        return e
    }
}
module.exports = {
    generateToken,
}