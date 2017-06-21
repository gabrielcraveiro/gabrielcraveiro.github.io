// Item completo

$('ul').on('click', 'li', function () {
  $(this).toggleClass('completo');
})

// Deletar item

$('ul').on('click', 'span', function (event) {
  $(this).parent().fadeOut(500, function () {
    $(this).remove();
  });
  event.stopPropagation();
})

$("input[type='text'").keypress(function (event) {
  if (event.which === 13) {
    // Pegar texto do input
    let texto = $(this).val();
    // Add novo li e dar um append na lista
    $('ul').append(`<li> <span>x</span> ${texto}</li>`);
  }
})