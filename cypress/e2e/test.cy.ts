describe('test', () => {
  it('check for new york weather and change untis', () => {
    cy.visit('http://localhost:3000')
    cy.get('.ReactSelect__control').click().type('New York').type('{enter}')
    cy.get('p').contains('New York')
    cy.get('p').contains('wind speed')
    cy.get('#temperatureDegrees').click()
    cy.get('#temperatureDegrees').click()
  })
})