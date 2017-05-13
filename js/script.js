// function retornaAtivos() {
//   'use strict';
//   let counter = 0;
//   const ativoArr = document.getElementsByClassName('btn--ativo');
//   ativoArr.forEach(function () {
//     counter++;
//   });
//   return counter > 0;
// }

/**
 * 
 * 
 * Filtra os projetos segundo a classe do botão
 * 
 * @param {btn--any} opc 
 * @param {class-any} opc2 
 */

function filtrar(opc, opc2) {
  'use strict';
  mudarPagina(1);
  let btn = document.getElementsByClassName(opc)[0];
  let ativosArr = Array.from(document.getElementsByClassName('btn--ativo'));
  let webArr = Array.from(document.querySelectorAll('.projetos__thumb'));
  let pag1 = document.getElementsByClassName('pp1')[0];
  let pag2 = document.getElementsByClassName('pp2')[0];

  if (btn.classList.contains('btn--ativo')) {
    webArr.forEach(function (x) {
      x.style.display = 'block';
      if (x.classList.contains('temp')) {
        pag2.insertBefore(x, pag2.firstChild);
        x.classList.remove('temp');
      }
      document.getElementsByClassName('pagina--2')[0].style.visibility = 'visible';
      btn.classList.remove('btn--ativo');
    });
  } else {
    webArr.forEach(function (x) {
      if (x.classList.contains(opc2)) {
        x.style.display = 'block';
        ativosArr.forEach(function (x) {
          x.classList.remove('btn--ativo');
        });
        if (x.parentElement.classList.contains('pp2')) {
          x.classList.add('temp');
          pag1.appendChild(x);
        }
        document.getElementsByClassName('pagina--2')[0].style.visibility = 'hidden';
        btn.classList.add('btn--ativo');
      } else {
        x.style.display = 'none';
      }
    });
  }

}



function mudarPagina(n) {
  'use strict';


  var paginas = document.querySelectorAll('.projetos__pagina');
  var paginasArr = Array.from(paginas);
  paginasArr
    .forEach(function (x) {
      if (x.classList.contains('pp' + n)) {
        x.style.display = 'block';
      } else {
        x.style.display = 'none';
      }
    });
  // if (n == 1) {
  //   document.getElementsByClassName('pagina--ativa')[0].classList.remove('pagina--ativa')
  // }
}

// function filtrar(btn, opc) {
//   'use strict';
//   var projpag = Array.from(document.querySelectorAll('.projetos__thumb'));
//   var btn = document.querySelector(btn);
//   projpag.forEach(function(x) {
//     if (!x.classList.contains(opc)) {
//       x.style.display = 'none';
//       btn.classList.add('btn--ativo');
//     }
//   })
// }

function main() { 
  // 1
  'use strict';

  // 2
  document.getElementsByClassName('btn--logo')[0].addEventListener('click', function () {
    filtrar('btn--logo', 'logo');
  });
  document.getElementsByClassName('btn--web')[0].addEventListener('click', function () {
    filtrar('btn--web', 'web');
  });
  document.getElementsByClassName('btn--js')[0].addEventListener('click', function () {
    filtrar('btn--js', 'js');
  });
  document.getElementsByClassName('pagina--1')[0].addEventListener('click', function () {
    mudarPagina(1);
  });
  document.getElementsByClassName('pagina--2')[0].addEventListener('click', function () {
    mudarPagina(2);
  });
  // document.getElementsByClassName('pagina--3')[0].addEventListener('click', function (x) {
  //   mudarPagina(3);
  // });
}



window.onload = main;