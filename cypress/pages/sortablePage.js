class SortablePage {
  visit() {
    cy.visit('https://demoqa.com/sortable');
    // Limpeza de UI para evitar que anúncios bloqueiem o mouse
    cy.get('body').then(($body) => {
      const ads = ['#fixedban', 'footer', '.ad-unit'];
      ads.forEach(s => {
        if ($body.find(s).length > 0) cy.get(s).invoke('remove');
      });
    });
  }

  // Técnica de arrasto por coordenadas com estabilização de estado
  moverParaPosicao(textoItem, indexDestino) {
    cy.contains('.list-group-item', textoItem).then(($source) => {
      const sourceRect = $source[0].getBoundingClientRect();

      cy.get('.list-group-item').eq(indexDestino).then(($target) => {
        const targetRect = $target[0].getBoundingClientRect();

        cy.wrap($source)
          .trigger('mousedown', { which: 1, clientX: sourceRect.left, clientY: sourceRect.top, force: true })
          .wait(200); // Tempo para o React ativar o "draggable"

        // Movimento inicial para descolar o item
        cy.wrap($source)
          .trigger('mousemove', { clientX: sourceRect.left + 5, clientY: sourceRect.top + 5, force: true })
          .wait(100);

        // Movimento para o destino final (com offset para garantir o encaixe)
        cy.get('body')
          .trigger('mousemove', { 
            clientX: targetRect.left + 10, 
            clientY: targetRect.top + 15, 
            force: true 
          })
          .wait(300)
          .trigger('mouseup', { force: true });
      });
    });
    cy.wait(600); // Espera a animação de reordenação do site
  }

  validarOrdemDecrescente() {
    const ordem = ['Six', 'Five', 'Four', 'Three', 'Two', 'One'];
    cy.get('.vertical-list-container .list-group-item').each(($el, i) => {
      cy.wrap($el).invoke('text').then((text) => {
        // Trim remove espaços em branco extras
        expect(text.trim()).to.equal(ordem[i]);
      });
    });
  }
}

export default new SortablePage();