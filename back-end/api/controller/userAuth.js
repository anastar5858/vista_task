const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
// validation modules
const { validateEmail } = require('../../utilities/validation/emailValidation');
const { validatePassword } = require('../../utilities/validation/passwordValidation');
api.post('/register', bodyParser.json(), (req, res) => {
 const email = req.body.email;
 const password = req.body.password;
 // perform validation
 const emailIsValid = validateEmail(email);
 if (!emailIsValid) return res.json('Invalid Email');
 const passwordIsValid = validatePassword(password);
 if (!passwordIsValid.state) return res.json(passwordIsValid);
 console.log(passwordIsValid);
 console.log(req.body);
})

module.exports = {
    api,
}