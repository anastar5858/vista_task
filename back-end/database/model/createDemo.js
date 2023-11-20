const { demos } = require('../schemas/demo');
const { connect } = require('../../utilities/mogodb/connect');

const createNewDemo = (title, url, demoElements) => {
    return new Promise( async (resolve, revoke) => {
        try {
            await connect().then( async () => {
                await demos.findOneAndUpdate({
                    title,
                }, {
                    title,
                    url,
                    demoElements,
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
    createNewDemo
}