Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');

  // გახსნათ მენიუ ან popup (თუ საჭიროა)
  cy.get('div.opn').click();

  // ვცადოთ შესვლის ღილაკის წვდომა
  cy.get('a.iprof > p').contains('შესვლა').should('be.visible').click();

  // ვივსებთ ფორმას
  cy.get('form.input-shablon').within(() => {
    cy.get('input[name="login_email"]').should('be.visible').type(email);
    cy.get('input[name="login_password"]').should('be.visible').type(password);
    cy.get('button[type="submit"]').click();
  });
});

Cypress.Commands.add('register', (name, email, password) => {
  cy.visit('/');

  // გავხსნათ მენიუ ან popup
  cy.get('div.opn').click();

  cy.get('a.iprof > p').contains('შესვლა').should('be.visible').click();

  // რეგისტრაციის ბმულზე გადასვლა
  cy.get('.pop-box.avtorization.active a').contains('გაიარეთ რეგისტრაცია').click();

  cy.get('input[name="first_name"]').type(name);
  cy.get('input[name="reg_email"]').type(email);
  cy.get('input[name="personal_id"]').type('12345678901');
  cy.get('input[name="phone"]').type('555123456');
  cy.get('input[name="reg_password"]').type(password);
  cy.get('input[name="reg_password_confirmation"]').type(password);

  cy.get('button.regsub').click();
});
