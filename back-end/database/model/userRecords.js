const { requests } = require('../schemas/request');
const { connect } = require('../../utilities/mogodb/connect');

const fetchUserRecordsFromDB = (email) => {
    return new Promise( async (resolve, revoke) => {
        try {
            const record = await connect().then(() => {
                return requests.find({
                    creator: email,
                });
            })
            resolve(record)
        } catch (e) {
            resolve(false)
        }
    })
}

module.exports = {
    fetchUserRecordsFromDB
}