describe('Zootopia E2E Tests', () => {
  beforeEach(() => {
    cy.fixture('users').then((users) => {
      users.newUser.email = users.newUser.email.replace('{{timestamp}}', Date.now());
      cy.wrap(users).as('users');
    });
  });

  // --- რეგისტრაცია ---
  it('Successful registration', function () {
    cy.get('@users').then((users) => {
      cy.register(users.newUser.name, users.newUser.email, users.newUser.password);
      cy.url().should('include', '/profile');
      cy.contains('გამარჯობა').should('exist');
    });
  });

  it('Registration with existing email fails', function () {
    cy.get('@users').then((users) => {
      cy.register(users.validUser.name, users.validUser.email, users.validUser.password);
      cy.contains('ასეთი ჩანაწერი უკვე არსებობს').should('be.visible');
      cy.url().should('include', '/register');
    });
  });

  // --- ავტორიზაცია ---
  it('Login with valid credentials', function () {
    cy.get('@users').then((users) => {
      cy.login(users.validUser.email, users.validUser.password);
      cy.url().should('include', '/profile');
      cy.contains('გამარჯობა').should('exist');
    });
  });

  it('Login with invalid credentials fails', function () {
    cy.get('@users').then((users) => {
      cy.login(users.invalidUser.email, users.invalidUser.password);
      cy.contains('არასწორი მონაცემები').should('exist');
    });
  });

  it('Logout successfully', function () {
    cy.get('@users').then((users) => {
      cy.login(users.validUser.email, users.validUser.password);
      cy.get('.logout-btn').click();
      cy.contains('შესვლა').should('exist');
    });
  });

  // --- კალათა ---
  it('Add product to cart', function () {
    cy.get('@users').then((users) => {
      cy.login(users.validUser.email, users.validUser.password);

      cy.visit('/ka');
      cy.get('input[name="keyword"]').type('SANICAT SUPERPLUS TR V/N 10L{enter}');
      cy.contains('a', 'SANICAT SUPERPLUS TR V/N 10L').click();

      cy.contains('ბ').parent('button').click(); // კალათაში დამატება
      cy.get('a.icart > p').click(); // კალათის გახსნა

      cy.get('.cart-box h2').should('contain', 'SANICAT SUPERPLUS TR V/N 10L');
    });
  });
});
