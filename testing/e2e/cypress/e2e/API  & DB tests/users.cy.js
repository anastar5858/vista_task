let validRecordEmail = 'something@gmail.com'
const { requestObjectMaker } = require('./utilities/responseMaker')
describe('register a user tests', () => {
    // validation
    it('registration validations', () => {
        // invalid emails
        cy.request(requestObjectMaker('POST', true, {email: '', password: ''}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/register')).then((response) => {
            expect(response.body).to.eq('Invalid Email')
        });
        cy.request(requestObjectMaker('POST', true, {email: 'dsfdfd@gmai', password: ''}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/register')).then((response) => {
            expect(response.body).to.eq('Invalid Email')
        });
        // invalid password
        cy.request(requestObjectMaker('POST', true, {email: 'something@gmail.com', password: 'wdksmadklasnskdfn'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/register')).then((response) => {
            expect(response.body.state).to.eq(false)
            expect(response.body.id).to.eq('pass-val-limit');
        });
        // everything is fine check the token in the returned response
        cy.request(requestObjectMaker('POST', true, {email: 'something@gmail.com', password: 'wdksmadklasnskdfn@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/register')).then((response) => {
            expect(response.body).to.eq('Registered');
            const searchParam = JSON.parse(response.requestBody).email;
            // check with databse task
            cy.task('db:fetch', ['users', 'email', searchParam]).then((records) => {
                expect(records[0].email).to.eq(searchParam)
            })
        });
        // register again
        cy.request(requestObjectMaker('POST', true, {email: 'something@gmail.com', password: 'wdksmadklasnskdfn@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/register')).then((response) => {
            expect(response.body).to.eq('Invalid');
        });
        // remove the record now
        cy.task('db:delete', ['users', 'email', validRecordEmail]);
    })
})


describe('verify & log out test', () => {
    it('verify token functioning', () => {
        const verifyUrl = 'http://localhost:8080/api/verify?some=' + 'something';
        const verifyUrl2 = 'http://localhost:8080/api/verify?some2=' + 'anotherthing';
        const verifyUrl3 = 'http://localhost:8080/api/verify?some3=' + 'thing4';
        cy.request(requestObjectMaker('GET', false, null, null, null, verifyUrl)).then((response) => {
            expect(response.body).to.eq('failed')
        });
        cy.request(requestObjectMaker('POST', true, {email: 'something@gmail.com', password: 'wdksmadklasnskdfn@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/register')).then((response) => {
        });
        cy.request(requestObjectMaker('GET', false, null, null, null, verifyUrl2)).then((response) => {
            expect(response.body).to.eq('log in')
        });
        cy.request(requestObjectMaker('GET', false, null, null, null, 'http://localhost:8080/api/logout')).then((response) => {
            expect(response.body).to.eq('logged out')
        });
        cy.request(requestObjectMaker('GET', false, null, null, null, verifyUrl3)).then((response) => {
            expect(response.body).to.eq('failed')
        });
        cy.task('db:delete', ['users', 'email', validRecordEmail]);
    })
})


describe('login test', () => {
    it('login validation and success', () => {
        // invalid email
        cy.request(requestObjectMaker('PATCH', true, {email: 'invalid', password: 'wdksmadklasnskdfn@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        // invalid password
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'wdksmadklasnskdfn'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        // fetch a record now
        cy.task('db:fetch', ['users', 'email', 'cypressTest@gmail.com']).then((records) => {
            const oldToken = records[0].token;
            // make the login now
            cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login')).then((response) => {
                expect(response.body).to.eq('success')
            });
            cy.task('db:fetch', ['users', 'email', 'cypressTest@gmail.com']).then((records) => {
                const newToken = records[0].token;
                expect(oldToken).to.not.eq(newToken)
            })
        });
    })

})




