/**
 * Filtra os projetos segundo a classe do botão
 * 
 * @param {btn--any} opc 
 * @param {class-any} opc2 
 */

function filtrar(opc,opc2) {
  'use strict';
  let btn = document.getElementsByClassName(opc)[0];
  let webArr = Array.from(document.querySelectorAll('.projetos__thumb'));
  if (btn.classList.contains('btn--ativo')) {
    webArr.forEach(function (x) {
      x.children[0].style.display = 'block';
      btn.classList.remove('btn--ativo');
    });
  } else {
    webArr.forEach(function (x) {
      if (x.firstElementChild.classList.contains(opc2)) {
        x.firstElementChild.style.display = 'block';
        btn.classList.add('btn--ativo');
      } else {
        x.firstElementChild.style.display = 'none';
      }
    });
  }
}

function main() {
  // 1
  'use strict';
  // 2
  document.getElementsByClassName('btn--logo')[0].addEventListener('click', function () {
    filtrar('btn--logo','logo');
  });
  document.getElementsByClassName('btn--web')[0].addEventListener('click', function () {
    filtrar('btn--web','web');
  });
}


window.onload = main;