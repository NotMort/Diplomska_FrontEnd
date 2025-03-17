describe('Nalaganje umetniškega dela', () => {
  it('naj omogoči uspešno nalaganje', () => {
    cy.visit('http://localhost:3000/upload')
    cy.get('input[type=file]').attachFile('test-images/sample.png')
    cy.get('#submit-button').click()
    cy.contains('Datoteka uspešno naložena!').should('be.visible')
  })
})
