const { requests } = require('../schemas/request');
const { connect } = require('../../utilities/mogodb/connect');
const updateRecordStatus = async (title, newStatus) => {
    return new Promise( async (resolve, revoke) => {
        const updatedRecord =  await connect().then( async () => {
            const result = await requests.findOneAndUpdate({
                title: title,
            }, {
                status: newStatus
            }, {
                upsert: true,
                new: true,
            });
            return result
        })
        resolve(updatedRecord);
    });
}
module.exports = {
    updateRecordStatus
}