class ProgressBarPage {
    get startStopButton() { return '#startStopButton'; }
    get progressBarValue() { return '#progressBar > div'; }

    visit() {
        cy.visit('https://demoqa.com/');
        cy.contains('Widgets').click();
        cy.contains('Progress Bar').click();
    }

    startProgressBar() {
        cy.get(this.startStopButton).click();
    }

    stopProgressBar() {
        cy.get(this.startStopButton).click();
    }

    getProgressValue() {
        return cy.get(this.progressBarValue)
                 .invoke('attr', 'aria-valuenow')
                 .then(Number);
    }

    getButtonText() {
        return cy.get(this.startStopButton).invoke('text');
    }
}
export default new ProgressBarPage();
