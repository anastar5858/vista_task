const { requests } = require('../schemas/request');
const { connect } = require('../../utilities/mogodb/connect');

const initiateNewRequestSave = (databasePayload) => {
    return new Promise( async (resolve, revoke) => {
        try {
            await connect().then( async () => {
                await requests.findOneAndUpdate({
                    title: databasePayload.title,
                }, {
                    title: databasePayload.title,
                    desc: databasePayload.desc,
                    status: databasePayload.status,
                    creator: databasePayload.creator,
                    date: databasePayload.date,
                }, {
                    upsert: true,
                });
            });
            resolve(true);
        } catch (e) {
            resolve(false);
        }
    })
}

module.exports = {
    initiateNewRequestSave,
}