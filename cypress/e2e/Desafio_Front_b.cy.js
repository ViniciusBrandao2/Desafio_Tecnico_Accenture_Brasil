import BrowserWindowsPage from '../pages/BrowserWindowsPage'

describe('Parte 2 - Desafio Frontend: Browser Windows', () => {
    const page = new BrowserWindowsPage()

    it('Deve abrir nova janela e validar a mensagem', () => {
        page.visitHomePage()
        page.navigateToAlertsFrameWindows()
        page.navigateToBrowserWindows()

        // Intercepta a nova janela
        cy.window().then(win => {
            cy.stub(win, 'open').as('newWindow')
        })

        page.openNewWindow()

        cy.get('@newWindow').should('be.called')

        // Simula visita à URL aberta na nova janela
        cy.visit('https://demoqa.com/sample')
        cy.contains('This is a sample page').should('be.visible')

        cy.go('back')
    })
})
