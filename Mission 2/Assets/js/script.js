// Section 1
const section1 = document.getElementById('section-1');
const warrior1 = document.querySelector('.warrior-1');
const warrior2 = document.querySelector('.warrior-2');
const textGladiator = document.getElementById('h1');
const textGladCaption = document.getElementById('h3');
const btn1 = document.getElementById('btn-1');

// Section 2


document.addEventListener('DOMContentLoaded', function() {
  RightToLeft(warrior1, 1000,750);
  LeftToRight(warrior2, 200,450);

  textGladiator.style.visibility = 'hidden';
  textGladCaption.style.visibility = 'hidden';

  setTimeout(() => {
    textGladiator.style.visibility = 'visible';
    bottomToTop(textGladiator, 350, 50, 1500)
  }, 800);

  setTimeout(() => {
    textGladCaption.style.visibility = 'visible';
    fadeIn(textGladCaption);
    topToBottom(textGladCaption, 110, 130, 15);
    fadeIn(btn1);
  }, 3000);

});

function RightToLeft(element,posStart, posEnd, duration=3000){
  let trans = posStart - posEnd;

  if (posStart < posEnd) {
    return 0;
  }

  animate({
    duration: duration,
    timing: function quad(timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction))
    },
    draw: function (progress) {
      element.style.left = posStart + (-1 * (progress * trans)) + 'px';
    }
  });
}

function LeftToRight(element, posStart, posEnd, duration=3000) {
  let trans = posStart - posEnd;

  if (posStart > posEnd) {
    return 0;
  }

  animate({
    duration: duration,
    timing: function quad(timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction))
    },
    draw: function (progress) {
      element.style.left = posStart + (-1 * (progress * trans)) + 'px';
    }
  });
}

function bottomToTop(element, posStart, posEnd, duration=3000){
  let trans = posStart-posEnd;

  if (posStart == posEnd) {
    return 0;
  }
    animate({
      duration: duration,
      timing: function quad(timeFraction) {
        return 1 - Math.sin(Math.acos(timeFraction))
      },
      draw: function (progress) {
        element.style.top = posStart + (-1*(progress*trans)) + 'px';
      }
    });
}

function topToBottom(element, posStart, posEnd, duration=3000) {
  let trans = posStart - posEnd;

  if (posStart == posEnd) {
    return 0;
  }
  animate({
    duration: duration,
    timing: function quad(timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction))
    },
    draw: function (progress) {
      element.style.top = posStart + (-1 * (progress * trans)) + 'px';
    }
  });
}

function fadeIn(element, duration = 600) {
  element.style.display = '';
  element.style.opacity = 0;
  let last = +new Date();
  let tick = function () {
    element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}

function fadeOut(element) {
  element.style.opacity = 1;
  (function fade() {
    if ((element.style.opacity -= .1) < 0) {
      element.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

btn1.addEventListener('click', function() {
  // fadeOut(btn1);
  console.log(window.screen.width);
  LeftToRight(section1, 0, window.screen.width, 1000);
});