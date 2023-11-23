let validRecordTitle = 'lovely'
const { requestObjectMaker } = require('./utilities/responseMaker')
describe('create a new request', () => {
    // validation
    it('create request validation validations', () => {
        // incomplete data
        cy.request(requestObjectMaker('POST', true, {title: '', desc: '', status: ''}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-request')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        cy.request(requestObjectMaker('POST', true, {title: 'lovely', desc: '', status: ''}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-request')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        cy.request(requestObjectMaker('POST', true, {title: 'lovely', desc: 'very nice!!', status: ''}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-request')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        // even though the data is complete the user must log in with a valid token
        cy.request(requestObjectMaker('POST', true, {title: 'lovely', desc: 'very nice!!', status: 'hello'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-request')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        cy.request(requestObjectMaker('POST', true, {title: 'lovely', desc: 'very nice!!', status: 'hello'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-request')).then((response) => {
            expect(response.body).to.eq('success')
        });
        cy.task('db:fetch', ['requests', 'title', validRecordTitle]).then((records) => {
            expect(records[0].title).to.eq(validRecordTitle)
        });
    })
})


describe('fetch all requests works', () => {
    it('fetch all requests', () => {
        // log in
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        // fetch data
        cy.request(requestObjectMaker('GET', false, null, null, null, 'http://localhost:8080/api/all-requests')).then((response) => {
            const allRequests = response.body;
            cy.task('db:fetch', ['requests', '', undefined]).then((records) => {
                console.group(allRequests)
                expect(records.length).to.eq(allRequests.length)
            });
        });
    })
})

describe('fetch all my requests', () => {
    it('fetch user specific requests', () => {
        // log in
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        // fetch data
        cy.request(requestObjectMaker('GET', false, null, null, null, 'http://localhost:8080/api/my-requests')).then((response) => {
            const allUserRequests = response.body;
            for (const userRequest of allUserRequests) {
                expect(userRequest.creator).to.eq('cypressTest@gmail.com')
            }
        });
    })
})

describe('fetch requests by status', () => {
    it('fetch user specific requests', () => {
        // log in
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        // fetch data
        cy.request(requestObjectMaker('GET', false, null, null, JSON.stringify(['pending']), 'http://localhost:8080/api/status-requests')).then((response) => {
            const allRequestsByStatus = response.body;
            for (const requestByStatus of allRequestsByStatus) {
                expect(requestByStatus.status).to.eq('pending')
            }
        });
        cy.request(requestObjectMaker('GET', false, null, null, JSON.stringify(['completed']), 'http://localhost:8080/api/status-requests')).then((response) => {
            const allRequestsByStatus = response.body;
            for (const requestByStatus of allRequestsByStatus) {
                expect(requestByStatus.status).to.eq('completed')
            }
        });
    })
})


describe('update request status', () => {
    it('update the request status works correctly', () => {
        // log in
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        // update data
        cy.request(requestObjectMaker('PUT', true, {title: 'lovely', newStatus: 'completed'} , {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/update-request-status')).then((response) => {
            const title = JSON.parse(response.requestBody).title;
            const newStatus = JSON.parse(response.requestBody).newStatus;
            cy.task('db:fetch', ['requests', 'title', title]).then((records) => {
                expect(records[0].status).to.eq(newStatus)
            });
        });
        cy.request(requestObjectMaker('PUT', true, {title: 'lovely', newStatus: 'pending'} , {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/update-request-status')).then((response) => {
            const title = JSON.parse(response.requestBody).title;
            const newStatus = JSON.parse(response.requestBody).newStatus;
            cy.task('db:fetch', ['requests', 'title', title]).then((records) => {
                expect(records[0].status).to.eq(newStatus)
            });
        });
    })
})

describe('check an owner ownership of a specific record', () => {
    it('check ownership', () => {
        // log in
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        // update data
        const ownerRecord = {
          "title": "lovely",
          "__v": 0,
          "creator": "cypressTest@gmail.com",
          "date": {
            "$date": "2023-11-23T00:05:46.307Z"
          },
          "desc": "very nice!!",
          "status": "hello"
        }
        const unownedRecord = {
            "title": "lovely",
            "__v": 0,
            "creator": "somebody@gmail.com",
            "date": {
              "$date": "2023-11-23T00:05:46.307Z"
            },
            "desc": "very nice!!",
            "status": "hello"
        }
        cy.request(requestObjectMaker('GET', false, null , null, JSON.stringify(ownerRecord), 'http://localhost:8080/api/check-ownership')).then((response) => {
            expect(response.body).to.eq(true)
        });
        cy.request(requestObjectMaker('GET', false, null , null, JSON.stringify(unownedRecord), 'http://localhost:8080/api/check-ownership')).then((response) => {
            expect(response.body).to.eq(false)
        });
    })
})

describe('A request can be deleted', () => {
    it('delete functionality', () => {
        // log in
        cy.request(requestObjectMaker('PATCH', true, {email: 'cypressTest@gmail.com', password: 'awsmkmkdnsdnfds@1B'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/login'));
        // delete a record that you do not own
        cy.request(requestObjectMaker('DELETE', true, {title: 'Nurse'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/delete-record')).then((response) => {
            expect(response.body).to.eq('failed')
        });
        // delete a record that you own
        cy.request(requestObjectMaker('DELETE', true, {title: 'lovely', creator: 'cypressTest@gmail.com'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/delete-record')).then((response) => {
            expect(response.body).to.eq('deleted')
        });
    })
})
