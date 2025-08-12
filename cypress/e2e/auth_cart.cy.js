describe('Zootopia E2E Tests', () => {
  beforeEach(function () {
    cy.fixture('users').then((users) => {
      // dynamic email for newUser
      users.newUser.email = users.newUser.email.replace('{{timestamp}}', Date.now());
      this.users = users;
    });
  });

  // --- რეგისტრაცია ---
  it('Successful registration', function () {
    cy.register(this.users.newUser.name, this.users.newUser.email, this.users.newUser.password);
    cy.url().should('include', '/dashboard');
    cy.contains('გამარჯობა').should('be.visible');
  });

  it('Registration with existing email fails', function () {
    cy.register(this.users.validUser.name, this.users.validUser.email, this.users.validUser.password);
    cy.contains('ელფოსტა უკვე დაკავებულია').should('be.visible');
    cy.url().should('include', '/register');
  });

  // --- ავტორიზაცია ---
  it('Login with valid credentials', function () {
    cy.login(this.users.validUser.email, this.users.validUser.password);
    cy.url().should('include', '/dashboard');
    cy.contains('გამარჯობა').should('be.visible');
  });

  it('Login with invalid credentials fails', function () {
    cy.login(this.users.invalidUser.email, this.users.invalidUser.password);
    cy.contains('არასწორი მონაცემები').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('Logout successfully', function () {
    cy.login(this.users.validUser.email, this.users.validUser.password);
    cy.get('.logout-btn').click();
    cy.url().should('include', '/login');
    cy.contains('შესვლა').should('be.visible');
  });

  // --- კალათა ---
  it('Add product to cart', function () {
    cy.login(this.users.validUser.email, this.users.validUser.password);
    cy.visit('/ka');
    cy.addToCartByProductName('Bosch Dog-Premium 20 kg');
    cy.get('#cart-items-count').should('contain', '1');
    cy.contains('დამატებულია').should('be.visible');
  });

  it('Remove product from cart', function () {
    cy.login(this.users.validUser.email, this.users.validUser.password);
    cy.visit('/ka/cart');
    cy.get('.remove-item').first().click();
    cy.contains('კალათა ცარიელია').should('be.visible');
  });
});
