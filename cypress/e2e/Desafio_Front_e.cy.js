
//Parte 2: UI Testing (Drag and Drop)
//URL: https://demoqa.com/sortable
//Objetivo: Ordenar uma lista vertical de forma decrescente (do 6 ao 1).
//Técnica Utilizada: Simulação de eventos de mouse (mousedown, mousemove, mouseup) com cálculos de coordenadas e tratamento de estados dinâmicos do React.
import SortablePage from "../pages/SortablePage";

describe("Desafio Accenture - Automação de Interface", () => {
  
  beforeEach(() => {
    // Evita que erros menores do site travem o teste
    Cypress.on('uncaught:exception', () => false);
  });

  it("Deve ordenar a lista de forma decrescente (Six para One)", () => {
    SortablePage.visit();
    
    // Isso faz com que o 6 suba naturalmente para o topo
    const itensParaMover = ['One', 'Two', 'Three', 'Four', 'Five'];

    itensParaMover.forEach((item) => {
      SortablePage.moverParaPosicao(item, 5);
    });

    // Toque final: garante que o Six esteja no topo (index 0)
    SortablePage.moverParaPosicao('Six', 0);

    // Validação final da sequência completa
    SortablePage.validarOrdemDecrescente();
  });
});

