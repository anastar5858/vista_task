const { requests } = require('../schemas/request');
const { connect } = require('../../utilities/mogodb/connect');

const fetchAllRecordsFromDB = async () => {
    return new Promise( async (resolve, revoke) => {
        try {
            const record = await connect().then(() => {
                return requests.find();
            })
            resolve(record)
        } catch (e) {
            resolve(false)
        }
    })
}
module.exports = {
    fetchAllRecordsFromDB,
}