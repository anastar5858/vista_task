const jwt = require('jsonwebtoken');
const options = {
    expiresIn: "1h",
}
const verifyToken = async (token) => {
    try {
        result = await jwt.verify(token, process.env.JWT_SECRET, options);
        if (result) return result;
        else return false
    } catch (e) {
        return false
    }
}
module.exports = {
    verifyToken,
}