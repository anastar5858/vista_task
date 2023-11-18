const { users } = require('../schemas/user');
const { connect } = require('../../utilities/mogodb/connect');

const initiateNewUserSave = async (email, hashedPassword, token, myEncode) => {
    return new Promise( async (resolve) => {
        try {
            // prevent duplications
            const result = await connect().then( async () => {
                return await users.find({
                    email: email,
                });
            })
            if (result.length > 0) resolve(false);
            await users.findOneAndUpdate({
                email: email,
            }, {
                email: email,
                password: hashedPassword,
                token: token,
                encyptedPass: myEncode,
            }, {
                upsert: true,
            })
            resolve(true);
        } catch (e) {
            resolve(false);
        }
    })
}
module.exports = {
    initiateNewUserSave,
}