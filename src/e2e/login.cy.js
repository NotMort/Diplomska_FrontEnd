describe('Prijava uporabnika', () => {
  it('naj zavrne napačne podatke', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#username').type('wronguser')
    cy.get('#password').type('wrongpass')
    cy.get('#login-button').click()
    cy.contains('Neveljavno uporabniško ime ali geslo').should('be.visible')
  })

  it('naj omogoči prijavo', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpass')
    cy.get('#login-button').click()
    cy.url().should('include', '/dashboard')
  })
})
