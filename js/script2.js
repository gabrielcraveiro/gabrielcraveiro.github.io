var spiraling = false;
var rotation = 0;
$(function() {

  var WIN = $(window);
  var DOC = $(document);
  var BODY = $("body");

  var _winW;
  var _winH;
  var smallScreen;
  var aspect = .618033;
  var axis = .7237;
  var spiralOrigin;
  var colorsArray = [];
  var bgColorsArray = [];
  var currentSection = 0;
  var currentSectionName;
  var touchStartY = 0;
  var touchStartX = 0;
  var moved = 0;
  var animRAF;
  var animating = false;
  var isTouchDevice;
  var showLineTimeout;

  var mobileSafari;

  var standalone = window.navigator.standalone,
      userAgent = window.navigator.userAgent.toLowerCase(),
      safari = userAgent.indexOf('safari') != -1 && userAgent.indexOf('chrome') == -1,
      firefox = userAgent.indexOf('firefox') != -1 || userAgent.indexOf('mozilla') == -1,
      ios = /iphone|ipod|ipad/.test( userAgent );

  if (firefox) {
    BODY.addClass('is-firefox');
  }
  if( ios ) {
      safari = true;
      if ( !standalone && safari ) {
          mobileSafari = true;

      } else if ( standalone && !safari ) {
          // STANDALONE

      } else if ( !standalone && !safari ) {
          // UIWEBVIEW

      };
  }

  WIN.on('touchstart',function(){
    isTouchDevice = true;
  })

  resizeHandler();

  if (!smallScreen) {
    $('.js-section-title-word').each(function(i){
      var title = $('.js-section-title-word').eq(i);
      title.html(function(index, html) {
        html = html.replace(/&amp;/g, '&');
        return html.replace(/\S/g, '<span>$&</span>');
      });
      $('span',title).each(function(j){
        $('span',title).eq(j).css({
          transitionDelay: j/20 + 's'
        })
      })
    });
  }
// EVENTS
/////////

  // UTIL EVENTS
  WIN.on('resize',resizeHandler);

  WIN.on('wheel', function(e) {
    moved = e.originalEvent.deltaY || 0;
    rotation += moved/-10;
    rotation = trimRotation();
    if (!BODY.hasClass('is-gallery')) {
      e.preventDefault();
      startScrollTimeout()
      cancelAnimationFrame(animRAF);
      scrollHandler();
    }
  });

  WIN.on('touchstart', function(e) {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    moved = 0;
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    cancelAnimationFrame(animRAF);
  })
  WIN.on('touchmove', function(e) {
    if (!BODY.hasClass('is-gallery')) {
      e.preventDefault()
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      moved = ((touchStartY - touch.pageY)+(touchStartX - touch.pageX)) * 3;
      touchStartX = touch.pageX;
      touchStartY = touch.pageY;
      rotation += moved/-10;
      rotation = trimRotation();
      startScrollTimeout();
      cancelAnimationFrame(animRAF);
      scrollHandler()
    }
  });
  WIN.on('touchend', function(e) {
    animateScroll()
  })
  WIN.on('scroll',function(e) {

  })
  WIN.on('mousemove',mousemoveHandler)

  WIN.on('keydown',function(e) {
    if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
      cancelAnimationFrame(animRAF);
      animateScroll((currentSection + 1) * -90,rotation)
    } else if (e.keyCode === 37 || e.keyCode === 38) {
      cancelAnimationFrame(animRAF);
      animateScroll((currentSection - 1) * -90,rotation)
    }
    scrollHandler()
  })

  $('#canvas').on('click',function(){
    clearTimeout(showLineTimeout)
    animateScroll(0,rotation)
  })

  $('.js-scroll').on('click',function(e){
    animateScroll((currentSection + 1) * -90,rotation)
    e.stopPropagation()
  })
  $('.js-section').on('click',function() {
    cancelAnimationFrame(animRAF)
    animateScroll($(this).index() * -90,rotation);
  })
  $('.js-contact-icon').on('click',function(e){
    if (!$(this).parent().parent().hasClass('active')) {
      e.preventDefault();
      return false;
    }
  })

  $('.js-gallery-description-box').on('click',function(e) {
    e.stopPropagation()
  })

  $('.js-project-cta').on('click', function(e) {
    if ($(this).parent().parent().hasClass('active')) {
      e.stopPropagation()
      document.body.scrollTop = 0;
      BODY.addClass('is-gallery');
      $('.js-gallery-description').html($('.js-section.active .js-description').html())
      $('.js-gallery-title').html($('.js-section.active .js-section-title').html())
      moveCloseIcon(e);
      $('.js-gallery img').attr('src','')
      for (var i=1;i<=4;i++) {
        $('.js-gallery img').eq(i-1).attr('src','ui/assets/images/projects/' + currentSectionName + i + '.jpg')
      }
    }
  })
  $('.js-project-cta').on('mouseenter',function(){
    $('.js-view-text', this).text('Open')
  })
  $('.js-project-cta').on('mouseleave',function(){
    $('.js-view-text', this).text('View')
  })
  $('.js-gallery').on('click', function() {
    BODY.removeClass('is-gallery');
  })
  $('.js-close-icon').on('click', function() {
    BODY.removeClass('is-gallery');
  })

// FUNCTIONS
////////////
  function animateScroll(targR,startR,speed) {
    var distance = startR - targR;
    var mySpeed = speed || .2;
    if (((targR || Math.abs(targR) === 0) && Math.abs(targR - rotation) > .1) || Math.abs(moved) > 1) {
      if (targR || Math.abs(targR) === 0) {
        rotation += mySpeed * (targR - rotation);
      } else {
        moved *= .98;
        rotation += moved/-10;
      }
      rotation = trimRotation();
      scrollHandler();
      animRAF = requestAnimationFrame(function(){
        animateScroll(targR,startR,speed)
      });
    } else if (targR || Math.abs(targR) === 0) {
      cancelAnimationFrame(animRAF)
      rotation = targR;
      rotation = trimRotation();
      scrollHandler();
    }
  }
  function scrollHandler() {
    requestAnimationFrame(function(){
      var scale = Math.pow(aspect,rotation/90);
      currentSection = Math.min(21,Math.max(-16,Math.floor((rotation-30)/-90)));
      if (currentSection < 20 && currentSection > -15) {
        $('.js-spiral').css({
          transform: 'rotate(' + rotation + 'deg) scale(' + scale + ')',
        })
        $('.js-dot').removeClass('op-100');
        $('.js-dot').eq(currentSection).addClass('op-100')
        var currentNum = currentSection + 1;
        if (currentNum < 1 || currentNum > 13) {
          currentNum = "LOST";
        }
        $('.js-current').text(currentNum);
        currentSectionName = $('.js-section').eq(currentSection).data('project')
        var bg = bgColorsArray[currentSection-1]
        var color = colorsArray[currentSection-1]
        BODY.css({
          backgroundColor: color,
          color: bg
        })
        $('.js-close-bg').css({
          fill: color,
        })
        $('.js-close-lines').css({
          fill: bg,
        })
        $('.js-eye-pupil').css({
          fill: bg
        })
        $('.js-eye-retina').css({
          fill: color
        })
        $('.js-eye-lid').css({
          fill: color
        })
        $('.js-section-title-word span').css({
          transitionDelay: 0,
          transition: 0
        })
        $('.js-gallery-image').css({
          background: color
        })
        $('.js-dots').css({
          color: color
        })
        $('.js-section').css({
          color: color
        })
        $('.js-view-icon').css({
          background: color,
          color: bg
        })
        $('.js-view-icon svg rect').css({
          stroke: bg
        })
        $('.js-view-icon svg line').css({
          stroke: bg
        })
        $('.js-view-icon svg polyline').css({
          stroke: bg
        })
        $('.js-nav').css({
          color: color
        })
        $('.js-nav svg path').css({
          fill: color
        })
        for (var i=0;i<$('.js-section').length;i++) {
          if (i - currentSection < -1) {
            $('.js-section').eq(i).css({
              visibility: 'hidden'
            })
          } else {
            $('.js-section').eq(i).css({
              visibility: 'visible'
            })
          }
          $('.js-section').eq(i).css({
            background: bg,
            transitionDelay: (i-currentSection)/20 + 's'
          })
        }
        $('.js-section').removeClass('active')
        $('.js-section').eq(currentSection).css({
          backgroundColor: ''
        }).addClass('active')

      }
      if (currentSection < 0) {
        spiraling = 'white';
      } else if (currentSection > $('.js-section').length) {
        spiraling = 'black';
        $('.js-spiral').css({
          pointerEvents: 'none'
        })
      } else {
        spiraling = false;
        $('.js-spiral').css({
          pointerEvents: 'auto'
        })
      }
    })
  }
  function trimRotation() {
    return Math.max(-1500, Math.min(1200, rotation))
  }
  function moveCloseIcon(e) {
    $('.js-close-icon').css({
      transform: 'translate3d(' + Math.floor(e.pageX - 24) + 'px,' + Math.min($('.js-gallery-description-box').offset().top - 30 - BODY.scrollTop(),Math.floor(e.pageY - BODY.scrollTop() - 24)) + 'px,0)',
      right: 'auto'
    })
  }

  function mousemoveHandler(e) {
    if (BODY.hasClass('is-gallery') && !smallScreen) {
      moveCloseIcon(e);
    } else {
      var currentSectionEl = $('.js-section.active');
      var retina = $('.js-eye-retina', currentSectionEl)
      var pupil = $('.js-eye-pupil', currentSectionEl)
      var highlight = $('.js-eye-highlight', currentSectionEl)
      var lid = $('.js-eye-lid', currentSectionEl)
      if (retina.offset()) {
        retina.css({
          transform: 'translate3d(' + (1-e.pageX/retina.offset().left)*-6 + 'px,' + (1-e.pageY/retina.offset().top)*-6 + 'px,0)'
        })
        pupil.css({
          transform: 'translate3d(' + (1-e.pageX/retina.offset().left)*-7 + 'px,' + (1-e.pageY/retina.offset().top)*-7 + 'px,0)'
        })
        highlight.css({
          transform: 'translate3d(' + (1-e.pageX/retina.offset().left)*-2 + 'px,' + (1-e.pageY/retina.offset().top)*-2 + 'px,0)'
        })
        lid.css({
          transform: 'scaleY(' +  Math.abs(1+Math.max(0,(1-Math.abs(e.pageY/retina.offset().top))*.2)) + ')'
        })
      }
    }
  }

  function resizeHandler () { // Set the size of images and preload them
    _winW = window.innerWidth;
    _winH = window.innerHeight;
    if (_winW < 960) {
      smallScreen = true;
    } else {
      smallScreen = false;
    }
    buildSpiral()
  }
  function buildSpiral() {
    spiralOrigin = Math.floor(_winW * axis) + 'px ' + Math.floor(_winW * aspect * axis) +'px';
    var sectionOrigin = Math.floor(_winW * axis) + 'px ' + Math.floor(_winW * aspect * axis) +'px';
    var w = _winW * aspect;
    var h = _winW * aspect;
    if (_winW < 960) {
      spiralOrigin = Math.floor((_winW/aspect) * aspect * (1 - axis)) +'px ' + Math.floor((_winW/aspect) * axis) + 'px ';
      sectionOrigin = Math.floor((_winW/aspect) * aspect * (1 - axis)) +'px ' + Math.floor((_winW/aspect) * axis) + 'px ';
      w = _winW;
      h = _winW;
    }
    var translate = '';
    if (safari || firefox) {
      translate = 'translate3d(0,0,0)'
      $('svg').css({
        transform: 'translate3d(0,0,0.0001px) scale(1)',
        backfaceVisiblity: 'hidden',
      })
      $('.js-view-icon').css({
        transform: 'translate3d(0,0,0)',
        backfaceVisiblity: 'hidden'
      })
    }
    $('.js-spiral').css({
      transformOrigin: spiralOrigin,
      backfaceVisiblity: 'hidden'
    })
    $('.js-total').text($('.js-section').length)

    $('.js-section').each(function(i){
      if ($('.js-dot').length < $('.js-section').length) {
        var dot = $('.js-dot').eq(0).clone()
        $('.js-dots').append(dot)
      }
      var myRot = Math.floor(90*i);
      var scale = Math.pow(aspect, i);
      $(this).css({
        width: w,
        height: h,
        transformOrigin: sectionOrigin,
        backfaceVisiblity: 'hidden',
      })
      document.querySelectorAll('.js-section')[i].style.transform = 'rotate(' + myRot + 'deg) scale(' + Math.pow(aspect, i) + ') ' + translate
      if (i > 0 && bgColorsArray.length < $('.js-section').length) {
        var bg = $(this).css('backgroundColor')
        bg = bg.substr(0, bg.indexOf(')') + 1)
        var color = $(this).css('color')
        colorsArray.push(color);
        bgColorsArray.push(bg);
        $(this).css({
          backgroundColor: bgColorsArray[0],
          color: colorsArray[0]
        })
      }
    })
    scrollHandler();
    BODY.addClass('is-in')
  }

  function startScrollTimeout () {
    clearTimeout(showLineTimeout)
    if (currentSection > -1 && currentSection < $('.js-section').length) {
      showLineTimeout = setTimeout(function(){
        // $('.js-spiral-line').css({
        //   display: 'none'
        // })
        cancelAnimationFrame(animRAF);
        animateScroll(currentSection * -90,rotation,.15);
      },200);
    }
  }

})