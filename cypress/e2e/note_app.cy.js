describe("Note App", function () {
  // beforeEach(function () {
  //   cy.visit("http://localhost:3000")
  //   cy.contains("login").click()
  //   cy.get("#username").type("param")
  //   cy.get("#password").type("test")
  //   cy.get("#login-button").click()
  // })

  // we created a custom command to login Cypress/commands.js
  beforeEach(function () {
    cy.login({ username: "adfsa", password: "adsfasf" })
  })

  // it("front page can be opened", function () {
  //   cy.contains("Notes")
  //   cy.contains("Filter list")
  // })

  // it("login is clicked", function () {
  //   // cy.contains("login").click()
  //   // cy.get("#username").type("param")
  //   // cy.get("#password").type("test")
  //   // cy.get("#login-button").click()

  //   cy.contains("param logged in")
  // })

  // testing for wrong user, using should and .and to chain
  // it("wrong login", function () {
  //   cy.contains("login").click()
  //   cy.get("#username").type("param")
  //   cy.get("#password").type("test")
  //   cy.get("#login-button").click()

  //   cy.get('.error').should('contain', 'wrong credentials')
  //     .and('have.css', 'color', 'rgb(255, 0, 0')
  //   .and('have.css', 'border-style', 'solid')

  // cy.get('html').should('not.contain', 'param is logged in')
  // })

  // it("create new note", function () {
  //   cy.contains("new note").click()
  //   cy.get("#note-name").type("this is note name")
  //   cy.get("#note-important").type("imporatnt tesxt")
  //   cy.contains("Save").click()
  // })

  // it("change important", function () {
  // cy.contains("Html is easy").contains("note is important").click()
  // cy.contains("test").contains("make note important").click()
  // })
})
