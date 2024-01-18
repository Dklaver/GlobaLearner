describe('End-to-End Registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
      cy.get('[data-testid="cypress-LoginUsername"]').should('exist').type('cypress1');
      cy.get('[data-testid="cypress-loginPassword"]').type('Cypress2');
      cy.get('[data-testid="cypress-loginSignin"]').should('exist').click();
      cy.wait(3000)
    });
  
    it('should type message', () => {
     
      cy.visit('http://localhost:3000/chat/10')
      cy.get('[data-testid="cypress-messageInput"]').should('exist')
      cy.get('[data-testid="cypress-messageSend"]').should('exist').click();
    });
  });
  