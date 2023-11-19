const { requests } = require('../schemas/request');
const { connect } = require('../../utilities/mogodb/connect');

const deleteRecord = (record) => {
    return new Promise( async (resolve, revoke) => {
        try {
            await connect().then( async () => {
                await requests.deleteOne({
                    title: record.title,
                });
            });
            resolve(true)
        } catch (e) {
            resolve(false);
        }

    });
}


module.exports = {
    deleteRecord
}