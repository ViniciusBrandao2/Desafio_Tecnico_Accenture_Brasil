
class BrowserWindowsPage {
    visitHomePage() {
        cy.visit('https://demoqa.com/')
    }

    navigateToAlertsFrameWindows() {
        cy.contains('div.card-body h5', 'Alerts, Frame & Windows').click()
    }

    navigateToBrowserWindows() {
        cy.contains('li span', 'Browser Windows').click()
    }

    openNewWindow() {
        cy.get('#windowButton').click()
    }
}

export default BrowserWindowsPage
