describe('Desafio API - DemoQA Book Store', () => {

  const user = {
    userName: `qa_user_${Date.now()}`,
    password: 'Teste@123'
  };

  let userId;
  let token;
  let books;

  it('Criar usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: user,
      failOnStatusCode: false
    }).then(response => {
      if (response.status === 201) {
        userId = response.body.userID;
      } else {
        cy.log('Usuário já existe');
      }
    });
  });

  it('Gerar token', () => {
    cy.request('POST', 'https://demoqa.com/Account/v1/GenerateToken', user)
      .then(response => {
        expect(response.status).to.eq(200);
        token = response.body.token;
      });
  });

  it('Autorizar usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Authorized',
      body: user
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  it('Listar livros disponíveis', () => {
    cy.request('GET', 'https://demoqa.com/BookStore/v1/Books')
      .then(response => {
        expect(response.status).to.eq(200);
        books = response.body.books.slice(0, 2);
      });
  });

  it('Reservar dois livros', () => {
    cy.request({
      method: 'POST',
      url: `https://demoqa.com/BookStore/v1/Books`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        userId: userId,
        collectionOfIsbns: books.map(book => ({ isbn: book.isbn }))
      }
    }).then(response => {
      expect(response.status).to.eq(201);
    });
  });

  it('Consultar detalhes do usuário', () => {
    cy.request({
      method: 'GET',
      url: `https://demoqa.com/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.books.length).to.be.greaterThan(0);
    });
  });

});
