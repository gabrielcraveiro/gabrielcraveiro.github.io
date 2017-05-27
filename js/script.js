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
  const btnTodos = document.querySelectorAll('.icon--homepage');
  const blog = document.querySelector('.blog');
  btnTodos.forEach(x => x.classList.remove('icon--active'));
  projetos.style.display = 'block';
  btn.classList.add('icon--active');
  projetos2.style.display = 'none';
  if (blog.style.display = 'block') {
    blog.style.display = 'none';
  } else {
    blog.style.display = 'block';
  }
}

function main() {
  // 1
  'use strict';
  document.getElementsByClassName('icon--text')[0].addEventListener('click', function () {
    filtro('icon--text', 'text', 'grid');
  });
  document.getElementsByClassName('icon--grid')[0].addEventListener('click', function () {
    filtro('icon--grid', 'grid', 'text');
  });
}



window.onload = main;