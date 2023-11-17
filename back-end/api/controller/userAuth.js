const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
// validation modules
const { validateEmail } = require('../../utilities/validation/emailValidation');
const { validatePassword } = require('../../utilities/validation/passwordValidation');
// token modules
const { generateToken } = require('../../utilities/auth/jwt-token/jwtGenerate');
// hashing modules
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { encode } = require('../../utilities/auth/encryption/encode');
// model (mvc) gateway - object-relational mapping
const { initiateNewUserSave } = require('../../database/model/register');
api.post('/register', bodyParser.json(), async (req, res) => {
 const email = req.body.email;
 const password = req.body.password;
 // perform validation
 const emailIsValid = validateEmail(email);
 if (!emailIsValid) return res.json('Invalid Email');
 const passwordIsValid = validatePassword(password);
 if (!passwordIsValid.state) return res.json(passwordIsValid);
 // now generate a valid jwt token with expiration (customizable)
 const token = await generateToken(req.body);
// now contact the model component for database communication (crete a record if not exists)
const myEncode = encode(password);
const hashedPassword = await bcrypt.hashSync(myEncode, saltRounds);
const modelProcess = await initiateNewUserSave(email, hashedPassword, token);
// save the token in the session
if (modelProcess) {
    req.session.token = token;
} else {
    req.session.token = req.session.token;
}
modelProcess ? res.json('Registered') : res.json('Invalid');
})
module.exports = {
    api,
}