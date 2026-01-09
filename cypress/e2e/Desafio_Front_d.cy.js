import progressBarPage from '../pages/progressBarPage';

describe('Widgets - Progress Bar', () => {
    it('Para antes de 24%, completa até 100% e reseta', () => {
        progressBarPage.visit();

    
        progressBarPage.startProgressBar();

        // Parar antes de 24%
        cy.wrap(null).then(() => {
            const check = () => {
                progressBarPage.getProgressValue().then(value => {
                    if (value >= 24) {
                        progressBarPage.stopProgressBar(); 
                        cy.log(`Progress parado em: ${value}%`);
                        expect(value).to.be.lte(24);
                    } else {
                        cy.wait(50).then(check);
                    }
                });
            };
            check();
        });

        // Start até 100%
        progressBarPage.startProgressBar();

        cy.wrap(null).then(() => {
            const check100 = () => {
                progressBarPage.getProgressValue().then(value => {
                    if (value >= 100) {
                        cy.log(`Progress chegou a: ${value}%`);

                        // Clicar no botão de reset
                        cy.get('#resetButton', { timeout: 5000 }).should('be.visible').click();

                        // Validar que barra zerou
                        progressBarPage.getProgressValue().should('eq', 0);
                    } else {
                        cy.wait(50).then(check100);
                    }
                });
            };
            check100();
        });
    });
});
