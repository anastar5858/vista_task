const { defineConfig } = require("cypress");
const { connect } = require('./utilities/mogodb/connect');
const { users } = require('./database/schemas/user');
require('dotenv').config();
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async "db:delete:record"() {
          const recordEmail = 'right@email.com';
          await connect().then( async () => {
            await users.deleteOne({email: recordEmail});
          });
          return true;
        },
        // if more tasks required in the node task event
      })
    },
  },
});
