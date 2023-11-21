const { demos } = require('../schemas/demo');
const { connect } = require('../../utilities/mogodb/connect');

const deleteDemo = (name) => {
    return new Promise( async (resolve, revoke) => {
        try {
            await connect().then( async () => {
                await demos.deleteOne({
                    title: name,
                });
            });
            resolve(true)
        } catch (e) {
            resolve(false);
        }

    });
}
module.exports = {
    deleteDemo
}