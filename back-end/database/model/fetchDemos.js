const { demos } = require('../schemas/demo');
const { connect } = require('../../utilities/mogodb/connect');
const fetchUrlDemos = (url) => {
    return new Promise( async (resolve, revoke) => {
        try {
            const results = await connect().then( async () => {
                const specificResults = await demos.find({
                    url,
                })
                return specificResults
            });
            resolve(results);
        } catch (e) {
            resolve(false);
        }
    })
}

const fetchUrlDemosByDomain = (domain) => {
    return new Promise( async (resolve, revoke) => {
        try {
            const results = await connect().then( async () => {
                const allDemos = await demos.find();
                return allDemos
            });
            const filteredByDomainArr = [];
            for (const demoObj of results) {
                if (demoObj.url.includes(domain)) {
                    filteredByDomainArr.push(demoObj);
                }
            }
            resolve(filteredByDomainArr);
        } catch (e) {
            resolve(false);
        }
    })
}
module.exports = {
    fetchUrlDemos,
    fetchUrlDemosByDomain
}