import PracticeFormPage from '../pages/PracticeFormPage';

describe('Desafio Frontend - Practice Form', () => {
    
    beforeEach(() => {
        // Ignora erros de exceção do site DemoQA
        Cypress.on('uncaught:exception', () => false);
    });

    it('Deve preencher o formulário, fazer upload de .txt e validar popup', () => {
        // 1. Acessa o site e limpa o layout
        PracticeFormPage.visit();

        // 2. Preenche o formulário com valores aleatórios
        PracticeFormPage.preencherFormularioAleatorio();

        // 3. Faz upload de arquivo .txt (O arquivo deve existir em cypress/fixtures/uploads/arquivo.txt)
        // Certifique-se de criar este arquivo na sua pasta do projeto
        PracticeFormPage.fazerUpload('uploads/arquivo.txt');

        // 4. Submete o formulário
        PracticeFormPage.enviar();

        // 5. Garante que popup abriu e o fecha em seguida
        PracticeFormPage.validarEFecharPopup();
    });
});