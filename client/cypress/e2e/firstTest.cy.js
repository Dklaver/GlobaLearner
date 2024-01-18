
describe('End-to-End Registration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should register a user', () => {
    cy.get('[data-testid="cypress-navtitle"]').should('exist').and('have.text', 'Globalearner');
    cy.get('[data-testid="cypress-navchat"]').should('exist').and('have.text', 'Chat');
    cy.get('[data-testid="cypress-navregister"]').should('exist').and('have.text', 'Register').click();

    // go to register
    cy.get('[data-testid="cypress-RegisterSignup"]').should('exist').and('be.disabled');

    cy.get('[data-testid="cypress-registerUsername"]').should('exist').type('a');
    cy.get('[data-testid="cypress-registerUsernameCheck"]').should('exist').and('have.text', ' 4 to 24 characters.Must begin with a letter.letters, numbers allowed');
    cy.get('[data-testid="cypress-registerUsername"]').type('{backspace}1234');

    cy.get('[data-testid="cypress-registerPassword"]').should('exist').type('TestPass1');
    cy.get('[data-testid="cypress-registerMatch"]').should('exist').type('TestPass2');
    cy.get('[data-testid="cypress-passwordMatch"]').should('have.text', ' Must be the same as the password above.');
    cy.get('[data-testid="cypress-registerMatch"]').type('{backspace}1');

    cy.get('[data-testid="cypress-RegisterSignup"]').should('not.be.disabled');

    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="cypress-LoginUsername"]').should('exist').type('cypress');
    cy.get('[data-testid="cypress-loginPassword"]').type('Cypress1');
    cy.get('[data-testid="cypress-loginSignin"]').should('exist').click();
    cy.wait(2000);

    cy.url().should('include', '/chats')
    
    cy.get('[data-testid="cypress-createChatButton"]').should('exist').click();
    cy.get('[data-testid="cypress-createChatName"]').should('exist').type('CypressTest');
    cy.get('[data-testid="cypress-createChatLanguage"]').should('exist')

    cy.get('[data-testid="cypress-createChat"]').should('exist')

      

      // cy.wait(5000)

      cy.visit('http://localhost:3000/chat/4');
      cy.get('[data-testid="cypress-messageInput"]').should('exist').type("this is a cypress test {enter}");
      cy.get('[data-testid="cypress-messageToChat"]').should('exist').click();
  
      // back to chat list page
      cy.get('[data-testid="cypress-showUsersChats"]').should('exist').click();
  });
});
