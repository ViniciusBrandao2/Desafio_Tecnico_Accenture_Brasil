import "cypress-real-events/support";
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error') || err.message.includes('cross-origin')) {
    return false; // previne falha do teste
  }
  return false; // opcional: ignora todos os erros do site
});