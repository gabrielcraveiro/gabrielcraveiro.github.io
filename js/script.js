/**
 * Remove todos os projetos que não estão de acordo com o filtro
 * 
 * @param {any} btnTipo => logo, web ou js
 * @param {any} escolha => quem você vai filtrar
 */
function filtro(btnTipo, escolha) {
  'use strict';
  const btn = document.querySelector('.' + btnTipo);
  const projetos = Array.from(document.getElementsByClassName('projeto--img'));
  if (btn.classList.contains('btn--ativo')) {
    const btnTodos = document.querySelectorAll('.btn');
    btnTodos.forEach(x => x.classList.remove('btn--ativo'));
    projetos.forEach((x) => {
      x.classList.remove('fadeOut');
      x.classList.add('fadeIn');
      x.style.display = 'inline-block';
    });
  } else { // Remove
    btn.classList.add('btn--ativo');
    projetos.forEach((x) => {
      if (!x.classList.contains(escolha)) {
        x.classList.add('animated','fadeOut');
      }
    });
  }
}

function main() {
  // 1
  'use strict';

  // 2
  document.getElementsByClassName('btn--logo')[0].addEventListener('click', function () {
    filtro('btn--logo', 'logo');
  });
  document.getElementsByClassName('btn--web')[0].addEventListener('click', function () {
    filtro('btn--web', 'web');
  });
  document.getElementsByClassName('btn--js')[0].addEventListener('click', function () {
    filtro('btn--js', 'js');
  });
}



window.onload = main;