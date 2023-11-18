const { users } = require('../schemas/user');
const { connect } = require('../../utilities/mogodb/connect');
const fetchEmailRecord = async (email) => {
    return new Promise( async (resolve, revoke) => {
        try {
            const record = await connect().then(() => {
                return users.find({
                    email,
                });
            });
            record.length > 0 ? resolve(record) : resolve(false);
        } catch (e) {
            resolve(false);
        }
    });
}
const updateToken = async (token, email) => {
    return new Promise(async (resolve, revoke) => {
        try {
            await users.findOneAndUpdate({
                email: email,
            }, {
                email: email,
                token: token,
            }, {
                upsert: true,
            })
            resolve(true);
        } catch (e) {
            resolve(false);
        }
    })
}
const fetchPassword = async (email) => {
    return new Promise(async (resolve, revoke) => {
        try {
            const record = await users.find({
                email: email,
            });
            resolve(record[0].encyptedPass);
        } catch (e) {
            resolve(false);
        }
    })
}
module.exports = {
    fetchEmailRecord,
    updateToken,
    fetchPassword
}