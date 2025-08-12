Cypress.Commands.add('login', (email, password) => {
  cy.visit('/ka/login');
  cy.get('input[name="login_email"]').type(email);
  cy.get('input[name="login_password"]').type(password);
  cy.get('.form-button').click();
});

Cypress.Commands.add('register', (name, email, password) => {
  cy.visit('/ka/register');
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="password_confirmation"]').type(password);
  cy.get('.form-button').click();
});

Cypress.Commands.add('addToCartByProductName', (productName) => {
  cy.contains('.product-item', productName)
    .find('.product-cart')
    .click();
});
