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

const updateRecordImage = async (title, imgSrc) => {
    console.log('from here', title, imgSrc);
    return new Promise( async (resolve, revoke) => {
        await connect().then( async () => {
            await requests.findOneAndUpdate({
                title: title,
            }, {
                picture: imgSrc
            }, {
                upsert: true,
            });
            return result
        })
        resolve(true);
    });
}
module.exports = {
    updateRecordStatus,
    updateRecordImage,
}