describe('Calendar Dialog', () => {
  it('Test Calendar-Dialog', () => {
    cy.visit('/');

    cy.get('.Nav-LogoLink').should('have.text', 'Energy-Tour');
    // cy.mount(CalendarDialog, {
    //   props: {
    //     isOpen: true,
    //     onSubmit(formFields: RecordType) {
    //       // eslint-disable-next-line
    //       console.log(formFields);
    //     },
    //     onCancel() {
    //       // eslint-disable-next-line
    //       console.log('Cancel');
    //     }
    //   }
    // });
  });
});
