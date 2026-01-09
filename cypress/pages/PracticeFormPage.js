class PracticeFormPage {
    // Seletores
    get firstName() { return '#firstName'; }
    get lastName() { return '#lastName'; }
    get email() { return '#userEmail'; }
    get genderMale() { return 'label[for="gender-radio-1"]'; }
    get mobile() { return '#userNumber'; }
    get subjects() { return '#subjectsInput'; }
    get hobbySports() { return 'label[for="hobbies-checkbox-1"]'; }
    get uploadInput() { return '#uploadPicture'; }
    get address() { return '#currentAddress'; }
    get state() { return '#state'; }
    get city() { return '#city'; }
    get submitBtn() { return '#submit'; }
    get modal() { return '.modal-content'; }
    get closeBtn() { return '#closeLargeModal'; }

    visit() {
        // Acesso direto à página do formulário
        cy.visit('https://demoqa.com/automation-practice-form');
        
        // Remove anúncios e rodapé que podem impedir o clique no Submit
        cy.get('body').then(($body) => {
            const selectors = ['#fixedban', 'footer', '.ad-unit'];
            selectors.forEach(s => {
                if ($body.find(s).length > 0) cy.get(s).invoke('remove');
            });
        });
    }

    preencherFormularioAleatorio() {
        const timestamp = Date.now();
        const fData = {
            fName: 'Vinicius',
            lName: 'Souza',
            mail: `user${timestamp}@test.com`,
            phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`.slice(0, 10)
        };

        cy.get(this.firstName).type(fData.fName);
        cy.get(this.lastName).type(fData.lName);
        cy.get(this.email).type(fData.mail);
        
        // Clica no label para evitar erro de elemento coberto
        cy.get(this.genderMale).click();
        cy.get(this.mobile).type(fData.phone);

        // Subjects: Digita e confirma com Enter
        cy.get(this.subjects).type('Maths{enter}');
        
        cy.get(this.hobbySports).click();
        cy.get(this.address).type('Rua de Teste Accenture, 123');

        // Seleção de Estado e Cidade (Dropdowns React)
        cy.get(this.state).click().get('[id^="react-select-3-option-0"]').click({ force: true });
        cy.get(this.city).click().get('[id^="react-select-4-option-0"]').click({ force: true });
    }

    fazerUpload(caminhoNoFixture) {
        // Agora o comando será reconhecido após o registro do plugin
        cy.get(this.uploadInput).attachFile(caminhoNoFixture);
    }

    enviar() {
        cy.get(this.submitBtn).click({ force: true });
    }

    validarEFecharPopup() {
        // Garante que o popup (modal) abriu
        cy.get(this.modal).should('be.visible').and('contain', 'Thanks for submitting the form');
        
        // Fecha o popup conforme solicitado
        cy.get(this.closeBtn).click({ force: true });
        
        // Garante que o popup foi fechado
        cy.get(this.modal).should('not.exist');
    }
}

export default new PracticeFormPage();