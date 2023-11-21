const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
// validation modules
const { validateEmail } = require('../../utilities/validation/emailValidation');
const { validatePassword } = require('../../utilities/validation/passwordValidation');
// token modules
const { generateToken } = require('../../utilities/auth/jwt-token/jwtGenerate');
const { verifyToken } = require('../../utilities/auth/jwt-token/verifyToken');
// hashing/decoding modules
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { encode } = require('../../utilities/auth/encryption/encode');
const { decode } = require('../../utilities/auth/encryption/decode');
// model (mvc) gateway - object-relational mapping
const { initiateNewUserSave } = require('../../database/model/register');
const { fetchEmailRecord, updateToken, fetchPassword } = require('../../database/model/login');
const { initiateNewRequestSave } = require('../../database/model/create');
const { fetchAllRecordsFromDB } = require('../../database/model/allRecords');
const { fetchUserRecordsFromDB } = require('../../database/model/userRecords');
const { fetchStatusRecordsFromDB } = require('../../database/model/statusRecord');
const { updateRecordStatus } = require('../../database/model/updateRecords');
const { deleteRecord } = require('../../database/model/deleteRecord');
const { createNewDemo } = require('../../database/model/createDemo');
const { fetchUrlDemos, fetchUrlDemosByDomain } = require('../../database/model/fetchDemos');
const { deleteDemo } = require('../../database/model/deleteDemo');
// webcrawling
const { backgroundFetch } = require('../../utilities/crawler/imgCrawler');
const { model } = require('mongoose');
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
    const { title, desc, status, autoImg } = req.body;
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
    if (autoImg) backgroundFetch(title);
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
});
api.get('/my-requests', async (req, res) => {
    const tokenIsValid = await verifyToken(req.session.token);
    if (!tokenIsValid) return res.json(false);
    const { email } = tokenIsValid;
    const userRecords = await fetchUserRecordsFromDB(email);
    res.json(userRecords);
})
api.get('/status-requests/:statusArr', async (req, res) => {
    const tokenIsValid = await verifyToken(req.session.token);
    if (!tokenIsValid) return res.json(false);
    const requestArr = JSON.parse(req.params.statusArr);
    let finalCombinedResults = [];
    for (const statusRequested of requestArr) {
        const statusRequestsRecord = await fetchStatusRecordsFromDB(statusRequested);
        finalCombinedResults.length > 0 ? finalCombinedResults = [...finalCombinedResults, ...statusRequestsRecord] : finalCombinedResults.push(...statusRequestsRecord);
    }
    res.json(finalCombinedResults);
} )
api.put('/update-request-status', bodyParser.json(), async (req,res) => {
    const tokenIsValid = await verifyToken(req.session.token);
    if (!tokenIsValid) return res.json(false);
    const responseObj = {}
    const allRecords = await fetchAllRecordsFromDB();
    responseObj.allRequests = allRecords;
    const updatedRecord = await updateRecordStatus(req.body.title, req.body.newStatus);
    responseObj.updatedRecord = updatedRecord;
    res.json(responseObj)
});
api.get('/check-ownership/:record', async (req, res) => {
    const tokenIsValid = await verifyToken(req.session.token);
    if (!tokenIsValid) return res.json(false);
    const record = JSON.parse(req.params.record);
    if (record.creator === tokenIsValid.email) return res.json(true);
    res.json(false);
})
api.delete('/delete-record', bodyParser.json(), async (req, res) => {
    const tokenIsValid = await verifyToken(req.session.token);
    if (!tokenIsValid) return res.json(false);
    const record = req.body;
    if (record.creator === tokenIsValid.email) {
        const deleted = await deleteRecord(record);
        deleted ? res.json('deleted') : res.json('failed');
    } else {
        return res.json('failed')
    }
});
// demo routes
api.post('/create-demo', bodyParser.json(), async (req,res) => {
    const { title, url, demoElements} = req.body;
    if (title === '' || url === '') res.json('invalid');
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!url.match(urlRegex)) return res.json('invalid url');
    for (const demoElement of demoElements) {
        if (demoElement.event !== 'click' && demoElement.event !== 'input') return res.json('invalid event');
    }
    // save to database (model part)
    const modelProcess = await createNewDemo(title, url, demoElements);
    modelProcess ? res.json('success') : res.json('invalid'); 
})
api.get('/fetch-demos/:url', async (req,res) => {
    const decodedUrl = decodeURIComponent(req.params.url);
    const modelProcess = await fetchUrlDemos(decodedUrl);
    res.json(modelProcess);
})
api.get('/fetch-demos-domain/:domain', async (req, res) => {
    const modelProcess = await fetchUrlDemosByDomain(req.params.domain);
    res.json(modelProcess);
})
api.delete('/delete-demo', bodyParser.json(), async (req, res) => {
    const demoName = req.body.name;
    const deleted = await deleteDemo(demoName);
    deleted ? res.json('deleted') : res.json('failed');
})
module.exports = {
    api,
}