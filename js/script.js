/**
 * Remove todos os projetos que não estão de acordo com o filtro
 * 
 * @param {any} btnTipo => logo, web ou js
 * @param {any} escolha => quem você vai filtrar
 */
function filtro(btnTipo, escolha, escolha2) {
  'use strict';
  const btn = document.querySelector('.' + btnTipo);
  const projetos = document.querySelector('.' + escolha);
  const projetos2 = document.querySelector('.' + escolha2);
  const btnTodos = document.querySelectorAll('.reset');
  btnTodos.forEach(x => x.classList.remove('reset--active'));
  projetos.style.display = 'block';
  btn.classList.add('reset--active');
  projetos2.style.display = 'none';
  
}

function main() {
  // 1
  document
    .getElementsByClassName('icon--text')[0]
    .addEventListener('click', function() {
      filtro('icon--text', 'text', 'grid');
    });
  document
    .getElementsByClassName('icon--grid')[0]
    .addEventListener('click', function() {
      filtro('icon--grid', 'grid', 'text');
    });
}

window.onload = main;
