describe('end to end', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="cypress-navtitle"]').should("exist").should('have.text', 'Globalearner');
    cy.get('[data-testid="cypress-navchat"]').should("exist").should('have.text', 'chat');
    cy.get('[data-testid="cypress-navregister"]').should("exist").should('have.text', 'register').click();

    // go to register
    cy.get('[data-testid="cypress-RegisterSignup"]').should('exist').should('be.disabled');

    cy.get('[data-testid="cypress-registerUsername"]').should("exist").type('a');
    cy.get('[data-testid="cypress-registerUsernameCheck"]').should("exist").should('have.text', ' 4 to 24 characters.Must begin with a letter.letters, numbers allowed')
    cy.get('[data-testid="cypress-registerUsername"]').type('{backspace}1234');

    cy.get('[data-testid="cypress-registerPassword"]').should("exist").type('TestPass1');
    cy.get('[data-testid="cypress-registerMatch"]').should("exist").type('TestPass2');
    cy.get('[data-testid="cypress-passwordMatch"]').should('have.text', ' Must be the same as the password above.')
    cy.get('[data-testid="cypress-registerMatch"]').type('{backspace}1');

    cy.get('[data-testid="cypress-RegisterSignup"]').should('not.be.disabled');

    // go to login

    
    
  })
})

describe('after login', () => {
  it ('passes', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-LoginUsername"]').should("exist").type('cypress');
    cy.get('[data-testid="cypress-loginPassword"]').type('Cypress1');
    cy.get('[data-testid="cypress-loginSignin"]').should("exist").click();

    // back to home
    cy.wait(3000);
    
    cy.get('[data-testid="cypress-navchat"]').should("exist").should('have.text', 'chat').click();

    // go to chat
    cy.window().then((win) => {
      const jwtToken = win.localStorage.getItem('jwt');

      expect(jwtToken).to.not.be.null;
    }),
    
    cy.wait(3000);

    cy.get('[data-testid="cypress-createChatButton"]').should('exist');
    cy.get('[data-testid="cypress-createChatButton"]').click();

    cy.get('[data-testid="cypress-createChatName"]').should("exist").type('CypressTest');
    cy.get('[data-testid="cypress-createChatLanguage"]').should("exist").type('English');

    cy.get('[data-testid="cypress-createChat"]').should("exist").click();

    //go in chat/$id
    cy.get('[data-testid="cypress-messageInput"]').should("exist").type("this is a cypress test {enter}");

    
    cy.reload();

    cy.get('[data-testid="cypress-messageToChat"]').should("exist").click();

    //back to chat list page

    cy.get('[data-testid="cypress-showUsersChats"]').should("exist").click();
  })
})