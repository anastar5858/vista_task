let validRecordTitle = 'lovely'
const { requestObjectMaker } = require('./utilities/responseMaker')


describe('create a new demo', () => {
    // validation
    it('create a demo validations & success', () => {
        const payload = {
            title: '', url: '', demoElements: [],
        }
        // incomplete data
        cy.request(requestObjectMaker('POST', true, payload, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-demo')).then((response) => {
            expect(response.body).to.eq('invalid')
        });
        payload.title = 'valid';
        payload.url = 'mumbo jumbo';
        cy.request(requestObjectMaker('POST', true, payload, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-demo')).then((response) => {
            expect(response.body).to.eq('invalid url')
        });
        payload.url = 'http://localhost:52016/__/#/specs/runner?file=cypress/e2e/API++%26+DB+tests/demos.cy.js';
        payload.demoElements = [{title: 'nice', message: 'user message', event: 'blah'}];
        cy.request(requestObjectMaker('POST', true, payload, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-demo')).then((response) => {
            expect(response.body).to.eq('invalid event')
        });
        payload.demoElements = [{title: 'nice', message: 'user message', event: 'click'}];
        cy.request(requestObjectMaker('POST', true, payload, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/create-demo')).then((response) => {
            expect(response.body).to.eq('success');
            cy.task('db:fetch', ['demos', 'title', 'valid']).then((records) => {
                expect(records[0].title).to.eq('valid')
            });
        });
    })
})



describe('fetch a demo by url', () => {
    it('url demo fetching', () => {
        const url = 'http://anasDomain:5500/assets/html/demo.html';
        cy.request(requestObjectMaker('GET', false, null, null, encodeURIComponent(url), 'http://localhost:8080/api/fetch-demos')).then((response) => {
            const demosByUrl = response.body;
            console.log(demosByUrl);
            for (const demo of demosByUrl) {
                expect(demo.url).to.eq(url)
            }
        });
    })
})

describe('fetch a demo by domain', () => {
    it('domain demo fetching', () => {
        const domain = 'localhost';
        cy.request(requestObjectMaker('GET', false, null, null, domain, 'http://localhost:8080/api/fetch-demos-domain')).then((response) => {
            const demosByDomain = response.body;
            for (const demo of demosByDomain) {
                expect(demo.url).to.include(domain)
            }
        });
    })
})

describe('A demo can be deleted', () => {
    it('delete demo functionality', () => {
        cy.request(requestObjectMaker('DELETE', true, {name: 'valid'}, {'Content-Type': 'application/json'}, null, 'http://localhost:8080/api/delete-demo')).then((response) => {
            expect(response.body).to.eq('deleted')
        });
    })
})
