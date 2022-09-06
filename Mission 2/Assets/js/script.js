let zoomCounter = 1;

// Section 1
const section1 = document.getElementById('section-1');
const warrior1 = document.querySelector('.warrior-1');
const warrior2 = document.querySelector('.warrior-2');
const textGladiator = document.getElementById('h1');
const textGladCaption = document.getElementById('h3');
const btn1 = document.getElementById('btn-1');
const detailW1 = document.getElementById('detail-warrior-1');
const detailW2 = document.getElementById('detail-warrior-2');
const smoke1 = document.getElementById('smoke-1');
const smoke2 = document.getElementById('smoke-2');


// Section 2
const section2 = document.getElementById('section-2');
const bg2 = document.getElementById('bg-2');
const boxChat = document.getElementById('box-chat');
const btnBack = document.getElementById('btn-back')
const thumbUp = document.getElementById('thumb-up');
const thumbDown = document.getElementById('thumb-down');
const keputusan = document.getElementById('keputusan');
const scroolsClose1 = document.getElementById('scrolls-close-1');
const scroolsOpen1 = document.getElementById('scrolls-open-1');

document.addEventListener('DOMContentLoaded', function() {
  RightToLeft(warrior1, 1000,750);
  LeftToRight(warrior2, 200,450);

  // Section 1
  textGladiator.style.visibility = 'hidden';
  textGladCaption.style.visibility = 'hidden';
  detailW1.style.visibility = 'hidden';
  detailW2.style.visibility = 'hidden';
  smoke1.style.visibility = 'hidden';
  smoke2.style.visibility = 'hidden';

  setTimeout(() => {
    textGladiator.style.visibility = 'visible';
    bottomToTop(textGladiator, 350, 50, 1500)
  }, 800);

  setTimeout(() => {
    textGladCaption.style.visibility = 'visible';
    fadeIn(textGladCaption);
    topToBottom(textGladCaption, 0, 120, 30);
    fadeIn(btn1);

    detailW1.style.visibility = 'visible';
    fadeIn(detailW1);
    detailW2.style.visibility = 'visible';
    fadeIn(detailW2);

    smoke1.style.visibility = 'visible';
    fadeIn(smoke1);
    smoke2.style.visibility = 'visible';
    fadeIn(smoke2);

  }, 3000);

  setTimeout(() => {
    setInterval(() => {
      shake(detailW1, 250, 1100, 2000);
      shake(detailW2, 250, 100, 2000);

      shake(smoke1, 480, 1000, 2000, false);
      shake(smoke2, 490, 400, 2000, false);
    }, 1000);
  }, 4000);

  // Section 2
  boxChat.style.visibility = 'hidden';
  thumbUp.style.visibility = 'hidden';
  thumbDown.style.visibility = 'hidden';
  keputusan.style.visibility = 'hidden';
  scroolsClose1.style.visibility = 'hidden';
  scroolsOpen1.style.visibility = 'hidden';

  setTimeout(() => {
    boxChat.style.visibility = 'visible';
    thumbUp.style.visibility = 'visible';
    thumbDown.style.visibility = 'visible';
    keputusan.style.visibility = 'visible';

    fadeIn(boxChat);
    fadeIn(thumbUp);
    fadeIn(thumbDown);
    fadeIn(keputusan);
    fadeIn(scroolsClose1);

    setInterval(() => {
      if(zoomCounter < 2){
        zoomIn(boxChat);
        zoomCounter++;
      }else{
        zoomOut(boxChat);
        zoomCounter--;
      }
    }, 1000);

    setInterval(() => {
      shake(thumbUp, 530, 620, 2000, false);
      shake(thumbDown, 535, 870, 2000, false);
    }, 1000);
  }, 10000);

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

function shake(e, top, left, time = 500, isTop = true, distance = 5,oncomplete ) {
  var time = time;
  var distance = distance;

  var start = (new Date()).getTime();
  animate();

  function animate() {
    var now = (new Date()).getTime();
    var elapsed = now - start;
    var fraction = elapsed / time;

    // What fraction of total time?
    if (fraction < 1) {
      var x = distance * (Math.sin(fraction * 4 * Math.PI));
      if(isTop == true){
        e.style.top = (x + top) + "px";
      }
      e.style.left = (x + left) + "px";

      // We're aiming for a smooth 40 frames/second animation.
      setTimeout(animate, Math.min(1, time - elapsed));
    } else {

      // Otherwise, the animation is complete
      if (oncomplete) oncomplete(e);
      // Invoke completion callback
    }
  }
}

function zoomIn(element) {
  var currWidth = element.clientWidth;
  element.style.width = (currWidth + 5) + "px";
}

function zoomOut(element) {
  var currWidth = element.clientWidth;
  element.style.width = (currWidth - 5) + "px";
}

btn1.addEventListener('click', function() {
  LeftToRight(section1, 0, window.screen.width, 1500);
});

btnBack.addEventListener('click', function() {
  RightToLeft(section1, window.screen.width , 0, 1500);
});

