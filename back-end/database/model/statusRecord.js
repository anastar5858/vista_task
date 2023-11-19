const { requests } = require('../schemas/request');
const { connect } = require('../../utilities/mogodb/connect');
const fetchStatusRecordsFromDB = (status) => {
    return new Promise( async (resolve, revoke) => {
        try {
            const record = await connect().then(() => {
                return requests.find({
                    status,
                });
            })
            resolve(record)
        } catch (e) {
            resolve(false)
        }
    })
}
module.exports = {
    fetchStatusRecordsFromDB
}