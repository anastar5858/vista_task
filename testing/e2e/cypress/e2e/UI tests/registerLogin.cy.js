// regsiter and login tests
describe(('testing login and registeration'), () => {
    afterEach(() => {
        cy.task('db:delete:record');
    })
    // registration
    context('registeration', () => {
        // validation
        it('registration client-side validation and submission functionality', () => {
            cy.visit('http://localhost:5500/index.html');
            // empty email not excepted
            cy.wait(2000);
            cy.get('#regsiter-btn').click();
            cy.get('#register-input').should('have.attr', 'placeholder', 'Empty Email');
            // wrong email not excepted
            cy.get('#register-input').type('wrong@email.')
            cy.get('#regsiter-btn').click();
            cy.get('#register-input').should('have.value', 'Invalid Email')
            cy.wait(2000);
            cy.get('#register-input').should('have.value', 'wrong@email.')
            cy.get('#register-input').clear();
            cy.get('#register-input').type('right@email.com');
            // password rules compliance
            cy.get('#password-input').type('1');
            cy.wait(2000);
            cy.get('#pass-val-long').next().should('not.be.checked');
            cy.get('#pass-val-limit').next().should('not.be.checked');
            cy.get('#pass-val-sten').next().should('not.be.checked');
            cy.get('#password-input').clear();
            cy.get('#password-input').type('aws');
            cy.get('#pass-val-sten').next().should('be.checked');
            cy.get('#pass-val-long').next().should('not.be.checked');
            cy.get('#pass-val-limit').next().should('not.be.checked');
            cy.get('#password-input').type('awsmkmkdnsdnfds');
            cy.get('#pass-val-sten').next().should('be.checked');
            cy.get('#pass-val-long').next().should('be.checked');
            cy.get('#pass-val-limit').next().should('not.be.checked');
            cy.get('#password-input').type('@1B');
            cy.get('#pass-val-sten').next().should('be.checked');
            cy.get('#pass-val-long').next().should('be.checked');
            cy.get('#pass-val-limit').next().should('be.checked');
            cy.get('#regsiter-btn').click();
            cy.url().should('eq', 'http://localhost:5500/assets/html/protected.html?lan=en');
            // test changing the language and logging out
            cy.get('#change-language-mode').click();
            cy.get('#ar').click();
            cy.get('#create-new-request-link').should('have.text', 'طلب جديد اخخخخ');
            cy.get('#log-out-btn').click();
            cy.wait(2000);
            cy.url().should('eq', 'http://localhost:5500/index.html?lan=ar');
            // register gain
            cy.get('#register-input').type('right@email.com');
            cy.get('#password-input').type('awsmkmkdnsdnfds@1B');
            cy.get('#regsiter-btn').click();
            cy.get('#regsiter-btn').should('have.text', "مسجل من قبل");
        })
    })
    // login
    context('login', () => {
        it('login validation and success', () => {
            cy.visit('http://localhost:5500/index.html');
            cy.get('#login-link').click();
            cy.wait(3000);
            cy.get('#login-btn').click();
            cy.get('#login-status').should('have.text', 'Invalid Credentials');
            // random email
            cy.get('#email-input').type('random@gmail.com');
            cy.get('#login-btn').click();
            cy.get('#login-status').should('have.text', 'Invalid Credentials');
            // invalid password
            cy.get('#email-input').clear();
            cy.get('#email-input').type('cypressTest@gmail.com');
            cy.get('#password-login').type('masnklnadskl');
            cy.get('#login-btn').click();
            cy.get('#login-status').should('have.text', 'Invalid Credentials');
            // successfull log in
            cy.get('#password-login').clear();
            cy.get('#password-login').type('awsmkmkdnsdnfds@1B');
            cy.get('#change-language-mode').click();
            cy.get('#ar').click();
            cy.get('#login-btn').click();
            cy.url().should('eq', 'http://localhost:5500/assets/html/protected.html?lan=ar');
        })
    })
})
