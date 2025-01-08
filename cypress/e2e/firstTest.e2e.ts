describe('First E2E Test of Winter Rent Crm', () => {
  it('passed', () => {
    cy.visit('/');

    cy.get("[data-testid='cypress-title']").should('exist').should('have.text', 'Energy-Tour');
  });
});
