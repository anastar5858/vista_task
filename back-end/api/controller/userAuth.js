const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
// validation modules
const { validateEmail } = require('../../utilities/validation/emailValidation');
const { validatePassword } = require('../../utilities/validation/passwordValidation');
// token modules
const { generateToken } = require('../../utilities/auth/jwt-token/jwtGenerate');
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
//  result = await jwt.verify(token, process.env.JWT_SECRET);

 console.log(token);
 console.log(passwordIsValid);
 console.log(req.body);
})

module.exports = {
    api,
}