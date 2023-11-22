// regsiter and login tests
describe(('testing login and registeration'), () => {
    // log in before each test
    beforeEach(() => {
        cy.visit('http://localhost:5500/index.html');
        cy.wait(2000);
        cy.get('#login-link').click();
        cy.wait(3000);
        cy.get('#email-input').type('cypressTest@gmail.com');
        cy.get('#password-login').type('awsmkmkdnsdnfds@1B');
        cy.get('#login-btn').click();
    })
    // create a request tests
    context('creating a request and the corresponding validations', () => {
        it('registration client-side validation and submission functionality', () => {
            const dummyRecord = {
                title: 'cyber space',
                desc: 'A lovely cyber space',
                status: 'pending'
            }
            // immediate creation (note no background photo requested here)
            cy.wait(6000);
            cy.get('#request-btn-demo').click();
            cy.get('#request-btn-demo').should('have.text', 'Missing Input')
            cy.wait(2000);
            cy.get('#request-title').type(dummyRecord.title);
            cy.get('#request-btn-demo').click();
            cy.get('#request-btn-demo').should('have.text', 'Missing Input')
            cy.wait(2000);
            cy.get('#request-desc').type(dummyRecord.desc);
            cy.get('#request-btn-demo').click();
            cy.get('#request-btn-demo').should('have.text', 'Missing Input')
            cy.wait(2000);
            cy.get(`#${dummyRecord.status}-demo`).click();
            cy.get('#request-btn-demo').click();
            cy.get('#request-btn-demo').should('have.text', 'success')
        })
    })
    // manage requests tests
    context('manage requests tests', () => {
        // changing animations working
        it('changing animations', () => {
            cy.get('#manage-requests-link').click();
            cy.get('#ellipse-plain').should('not.be.undefined');
            cy.get('#fly-demo').click()
            cy.get('#ellipse').should('not.be.undefined');
            cy.get('#ellipse-plain').should('not.exist');
            cy.get('#default-demo').click()
            cy.get('#ellipse-plain').should('exist');
            cy.get('#ellipse').should('not.exist');
        });
        // navigation works
        it('navigation tests', () => {
            cy.get('#manage-requests-link').click();
            const firstTitle = 'sdsdsfdsfdsfdsfdsfdsfdsfdf';
            const secondTitle = 'the project';
            cy.get('#prev-demo').click();
            cy.get('#request-title').should('have.text', firstTitle);
            cy.get('#next-demo').click();
            cy.wait(5000);
            cy.get('#request-title').should('have.text', secondTitle);
            cy.get('#fly-demo').click()
            cy.get('#prev-demo').click();
            cy.wait(5000);
            cy.get('#request-title').should('have.text', firstTitle);         
        });
        // filtering works
        it('filter tests', () => {
            cy.get('#manage-requests-link').click();
            const firstTitle = 'sdsdsfdsfdsfdsfdsfdsfdsfdf';
            const owner = 'cypressTest@gmail.com';
            // my requests filter (check delete button and owner);
            cy.get('#creator-sign').should('not.have.text', `Created By:${owner}`)
            cy.get('#request-title').should('have.text', firstTitle);
            cy.get('#mine-demo').click();
            cy.get('#creator-sign').should('have.text', `Created By:${owner}`)
            cy.get('#request-title').should('not.have.text', firstTitle);
            cy.get('#delete-request-btn').should('exist');
            cy.get('#ellipse-plain').should('not.have.attr', 'background');
            // all requests should be back to first title
            cy.get('#all-demo').click();
            cy.get('#request-title').should('have.text', firstTitle);
            // filter by progress (check the progress of the card)
            cy.get('#request-status').should('have.text', 'completed');
            cy.get('#status-filter-demo').click();
            cy.get('#status-filter-demo-pending').click();
            cy.get('#request-status').should('have.text', 'pending');
        })
        // background image (crawler) feature testing -- may not work sometimes due to puppeteer behaviour
        it('background img feature tests', () => {
            const dummyRecord = {
                title: 'cyber space',
                desc: 'A lovely cyber space',
                status: 'pending'
            }            
            cy.get('#request-title').type(dummyRecord.title);
            cy.get('#request-desc').type(dummyRecord.desc);
            cy.get(`#${dummyRecord.status}-demo`).click();
            cy.get('#request-crawler-demo').click();
            cy.get('#request-btn-demo').click();
            cy.wait(40000);
            cy.get('#manage-requests-link').click();
            cy.get('#ellipse-plain').should('have.css', 'background').and('not.match', /url\(.+\)/);
            cy.get('#mine-demo').click();
            cy.wait(3000);
            cy.get('#photo-mode-demo').click();
            cy.get('#ellipse-plain').should('have.css', 'background').and('match', /url\(.+\)/);
        })
        // changing status live and deleting
        it('live changing status and deleting', () => {
            const firstTitle = 'sdsdsfdsfdsfdsfdsfdsfdsfdf';
            const prevStatus = 'pending';
            const newStatus = 'completed';
            cy.get('#manage-requests-link').click();
            cy.get('#mine-demo').click();
            cy.get('#request-status').should('have.text', prevStatus);
            cy.get('#live-edit-completed').click();
            cy.wait(2000);
            cy.get('#request-status').should('have.text', newStatus);
            cy.get('#delete-request-btn').click();
            cy.get('#request-title').should('have.text', firstTitle);
        });
    })
})