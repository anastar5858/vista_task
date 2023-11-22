// demo view tests
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
        cy.wait(4000);
        cy.get('#manage-requests-link').click();
    })
    // demo view tests
    context('demo running flow tests', () => {
        it('registration client-side validation and submission functionality', () => {
            const demoTitle = 'Management';
            cy.get('#demo-btn').should('have.text', ' Help demos')
            cy.get('#demo-btn').click();
            cy.get('#demo-btn').should('have.text', ' Hide help demo')
            // execute the demo and wait for the quiz to appear
            cy.get(`#${demoTitle}-demo`).click();
            cy.wait(17000);
            cy.get('#custom-select-quiz-container').parent().should('have.id', 'animation-section-container');
            cy.get('#custom-select-quiz-menu').select('input');
            cy.get('#quiz-answer-message').should('have.text', 'Incorrect');
            cy.wait(6000);
            cy.get('#custom-select-quiz-menu').select('click');
            cy.get('#quiz-answer-message').should('have.text', 'Correct');
            cy.wait(3000);
            cy.get('#custom-select-quiz-container').parent().should('have.id', 'navigation-section-container');
        })
    })
})