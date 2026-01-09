import WebTablesPage from "../pages/WebTablesPage";

describe("Desafio Accenture - Web Tables Full Flow", () => {
  
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    WebTablesPage.visit();
  });

  it("Fluxo 1: Deve criar, editar e deletar o registro do Vinicius", () => {
    const user = { 
      firstName: 'Vinicius', 
      lastName: 'Accenture', 
      email: 'vinicius@qa.com', 
      age: '28', 
      salary: '8000', 
      department: 'QA' 
    };
    const edit = { ...user, email: 'v.senior@accenture.com' };

    WebTablesPage.clicarAdicionar();
    WebTablesPage.preencherFormulario(user);
    WebTablesPage.validarRegistro(user.email, true);
    
    WebTablesPage.editarRegistro(user.email, edit);
    WebTablesPage.validarRegistro(edit.email, true);
    
    WebTablesPage.deletarRegistro(edit.email);
    WebTablesPage.validarRegistro(edit.email, false);
  });

  it("Fluxo 2 (BÔNUS): Deve criar 12 registros e deletar todos via memória", () => {
    // 1. Criação dos 12 usuários
    WebTablesPage.criarVariosRegistros(12);

    // 2. Deleção sequencial usando a lista de e-mails salva
    WebTablesPage.deletarApenasOsNovos();

    // 3. Validação final apenas dos nossos dados
    // Confirmamos que nenhum e-mail do nosso domínio de teste restou na tabela
    WebTablesPage.validarRegistro('@test.com', false);

    cy.log('Bônus concluído: Tabela limpa com sucesso.');
  });

});