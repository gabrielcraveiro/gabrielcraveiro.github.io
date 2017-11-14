$(".aba div").on('click', function () {
  if ($('aba-resume').hasClass('aba-ativa')) {
    $('.aba-resume').toggleClass('aba-ativa').toggleClass('aba-inativa');
    $('.aba-person').toggleClass('aba-ativa').toggleClass('aba-inativa');
    $('.terminal-personjs').toggle();
    $('.terminal-resume').toggle();
  } else {
    $('.aba-person').toggleClass('aba-ativa').toggleClass('aba-inativa');
    $('.aba-resume').toggleClass('aba-ativa').toggleClass('aba-inativa');
    $('.terminal-resume').toggle();
    $('.terminal-personjs').toggle();
  }
});

AOS.init();

// ===== Scroll to Top ==== 

$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {
    $('.desaparecer').fadeIn(500);
  } else {
    $('.desaparecer').fadeOut(500);
  }
});
$('#return-to-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 300);
});