const { defineConfig } = require("cypress");
const { connect } = require('./utilities/mogodb/connect');
const { users } = require('./database/schemas/user');
const { requests } = require('./database/schemas/request');
const { demos } = require('./database/schemas/demo');
require('dotenv').config();
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here (database related)
      on("task", {
        async "db:delete:record"() {
          const recordEmail = 'right@email.com';
          await connect().then( async () => {
            await users.deleteOne({email: recordEmail});
          });
          return true;
        },
        async 'db:fetch'(args) {
          const collection = args[0];
          const property = args[1];
          const searchParam = args[2];
          const recordFetched = await connect().then(async () => {
            if (collection === 'users') {
              const records = await users.find({
                [property]: searchParam,
              });
              if (records.length > 0) return records;
              else return [];
             }
             if (collection === 'requests') {
              const records = await requests.find({
                [property]: searchParam,
              });
              if (records.length > 0) return records;
              else return [];
             }
             if (collection === 'demos') {
              const records = await demos.find({
                [property]: searchParam,
              });
              if (records.length > 0) return records;
              else return [];
             }
            }
          )
          return recordFetched
        },
        async 'db:delete'(args) {
          const collection = args[0];
          const property = args[1];
          const searchParam = args[2];
          await connect().then(async () => {
            if (collection === 'users') {
              await users.deleteOne({
                [property]: searchParam,
              });
             }
             if (collection === 'requests') {
              await requests.deleteOne({
                [property]: searchParam,
              });
             }
             if (collection === 'demos') {
              await demos.deleteOne({
                [property]: searchParam,
              });
             }
            }
          )
          return 'deleted'
        },
        // if more tasks required in the node task event
      })
    },
  },
});
