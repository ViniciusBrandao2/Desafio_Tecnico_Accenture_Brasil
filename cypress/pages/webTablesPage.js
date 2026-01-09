class WebTablesPage {
  constructor() {
    this.listaEmails = []; // Memória para rastrear os usuários criados
  }

  visit() {
    cy.visit('https://demoqa.com/webtables');
    
    // Limpeza de interface para estabilidade
    cy.get('body').then(($body) => {
      const selectors = ['#fixedban', 'footer', '.ad-unit'];
      selectors.forEach(s => {
        if ($body.find(s).length > 0) cy.get(s).invoke('remove');
      });
    });
    
    // Configura 20 linhas para manter a tabela estável
    cy.get('select[aria-label="rows per page"]').select('20');
  }

  clicarAdicionar() {
    cy.get('#addNewRecordButton').should('be.visible').click();
  }

  preencherFormulario(dados) {
    cy.get('.modal-content').should('be.visible');
    
    cy.get('#firstName').clear().type(dados.firstName);
    cy.get('#lastName').clear().type(dados.lastName);
    cy.get('#userEmail').clear().type(dados.email);
    cy.get('#age').clear().type(dados.age);
    cy.get('#salary').clear().type(dados.salary);
    cy.get('#department').clear().type(dados.department);
    
    cy.get('#submit').click();
    cy.get('.modal-content').should('not.exist');
    
    // Guarda o e-mail na memória para exclusão posterior
    if (!this.listaEmails.includes(dados.email)) {
      this.listaEmails.push(dados.email);
    }
  }

  editarRegistro(emailOriginal, novosDados) {
    cy.contains('.rt-tr-group', emailOriginal)
      .find('[id^="edit-record-"]')
      .click();
    this.preencherFormulario(novosDados);
  }

  deletarRegistro(email) {
    cy.contains('.rt-tr-group', email)
      .find('[id^="delete-record-"]')
      .click({ force: true });
    
    cy.get('.rt-tbody').should('not.contain', email);
  }

  criarVariosRegistros(quantidade) {
    this.listaEmails = []; 
    for (let i = 1; i <= quantidade; i++) {
      const emailUnico = `user${i}_${Date.now()}@test.com`;
      this.clicarAdicionar();
      this.preencherFormulario({
        firstName: `User${i}`,
        lastName: 'Accenture',
        email: emailUnico,
        age: '30',
        salary: '1000',
        department: 'QA'
      });
    }
  }

  deletarApenasOsNovos() {
    // Percorre a lista de memória e deleta um por um
    cy.wrap(this.listaEmails).each((email) => {
      cy.contains('.rt-tr-group', email)
        .find('[id^="delete-record-"]')
        .click({ force: true });
      
      // Valida a exclusão individual para manter o sincronismo
      cy.get('.rt-tbody').should('not.contain', email);
    });
  }

  validarRegistro(email, existe = true) {
    if (existe) {
      cy.get('.rt-tbody').should('contain', email);
    } else {
      cy.get('.rt-tbody').should('not.contain', email);
    }
  }
}

export default new WebTablesPage();