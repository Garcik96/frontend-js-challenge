describe('Trends', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.wait(1000);
  });

  it('Should load the trend list', () => {
    cy.get('.trend__container > :nth-child(1)').should('exist');
  });

  it('Should create a new trend', () => {
    cy.get('.app-button--floating').should('exist').click();

    cy.get('.p-sidebar-content').should('be.visible');
    cy.get('.trend-edit-header__title').should('have.text', ' Nueva noticia ');

    cy.get('#trendUrl').click().type('URL Test');
    cy.get('#trendTitle').click().type('Title Test');
    cy.get('#trendImage').click().type('Image Test');
    cy.get('#trendBody').click().type('Body Test');

    cy.get('.trend-edit-header__actions > .app-button--primary').click();

    cy.contains('Title Test').should('exist');
  });

  it('Should edit a trend', () => {
    cy.contains('Title Test').click();

    cy.get('.trend__actions > :nth-child(1)').should('exist').click();

    cy.get('.p-sidebar-content').should('be.visible');
    cy.get('.trend-edit-header__title').should(
      'have.text',
      ' Edita la noticia '
    );

    cy.get('#trendUrl').click().clear().type('Edited Title Test');
    cy.get('#trendTitle').click().clear().type('Edited Title Test');
    cy.get('#trendImage').click().clear().type('Edited Image Test');
    cy.get('#trendBody').click().clear().type('Edited Body Test');

    cy.get('.trend-edit-header__actions > .app-button--primary').click();
    cy.wait(1000);

    cy.contains('Edited Title Test').should('exist');
  });

  it('Should delete a trend', () => {
    cy.contains('Edited Title Test').click();
    cy.get('.trend__actions > :nth-child(2)').should('exist').click();
    cy.contains('Edited Title Test').should('not.exist');
  });
});
