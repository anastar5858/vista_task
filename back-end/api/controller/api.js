const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
// validation modules
const { validateEmail } = require('../../utilities/validation/emailValidation');
const { validatePassword } = require('../../utilities/validation/passwordValidation');
// token modules
const { generateToken } = require('../../utilities/auth/jwt-token/jwtGenerate');
const { verifyToken } = require('../../utilities/auth/jwt-token/verifyToken');
// hashing modules
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { encode } = require('../../utilities/auth/encryption/encode');
const { decode } = require('../../utilities/auth/encryption/decode');
// model (mvc) gateway - object-relational mapping
const { initiateNewUserSave } = require('../../database/model/register');
const { fetchEmailRecord, updateToken, fetchPassword } = require('../../database/model/login');
const { initiateNewRequestSave } = require('../../database/model/create');
const { fetchAllRecordsFromDB } = require('../../database/model/allRecords');
// POST for registration
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
req.session.decode = myEncode;
console.log(myEncode, 'ummm');
const hashedPassword = await bcrypt.hashSync(myEncode, saltRounds);
const modelProcess = await initiateNewUserSave(email, hashedPassword, token, myEncode);
// save the token in the session
if (modelProcess) {
    req.session.token = token;
} else {
    req.session.token = req.session.token;
}
modelProcess ? res.json('Registered') : res.json('Invalid');
});
// GET for verifying the token
api.get('/verify', async (req, res) => {
    const token = req.session.token;
    const tokenIsValid = await verifyToken(token);
    console.log('token is valid', req.session.token)
    tokenIsValid ? res.json('log in') : res.json('failed');
});
// Get for loggin out
api.get('/logout', async (req, res) => {
    req.session.token = undefined
    res.json('logged out');
});
// patch login route
api.patch('/login', bodyParser.json(), async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // first find the record
    const record = await fetchEmailRecord(email);
    if (!record) return res.json('invalid');
    // then compare the passwords
    const recordObj = record[0];
    const storedPass = recordObj.password;
    let myEncode = req.session.decode;
    if (!myEncode) {
        const record = await fetchPassword(email);
        myEncode = record;
        console.log(myEncode, 'ummmm', record)
    }
    const compareVariable = await bcrypt.compareSync(myEncode, storedPass, saltRounds);
    const decoded = decode(myEncode);
    if (password !== decoded || !compareVariable) return res.json('invalid');
    // then generate a new token and update the request.token
    const payload = {email: recordObj.email, password: recordObj.password};
    const token = await generateToken(payload);
    const updateIndicator = await updateToken(token, recordObj.email);
    req.session.token = token;
    updateIndicator ? res.json('success') : res.json('invalid');
});
// protected routes start here (manipulation of request data)
// Post route for adding a new request
api.post('/create-request', bodyParser.json(), async (req, res) => {
    const { title, desc, status } = req.body;
    const date = new Date();
    const tokenIsValid = await verifyToken(req.session.token);
    const {email: creator} = tokenIsValid
    // validate 
    if (title === '' || desc === '' || status === '' || !tokenIsValid) return res.json('invalid')
    const databasePayload = {
        title,
        desc,
        status,
        date,
        creator,
    }
    const modelProcess = await initiateNewRequestSave(databasePayload);
    modelProcess ? res.json('success') : res.json('invalid');
});
// Get route for getting all requests
api.get('/all-requests', async (req, res) => {
    // verify token
    const tokenIsValid = await verifyToken(req.session.token);
    if (!tokenIsValid) return res.json(false);
    const allRecords = await fetchAllRecordsFromDB();
    res.json(allRecords);
})
module.exports = {
    api,
}