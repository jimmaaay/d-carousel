(function() {
  var carousel1 = dCarousel(document.querySelector('.d-carousel--example-1'), {
    delta: function() {
      return 16;
    },
  });
}());

(function() {

  var example2 = document.querySelector('.d-carousel--example-2');
  var counter = document.querySelector('#carousel-2-counter');
  var count = 0;
  var carousel2 = dCarousel(example2, {
    paddingLeft: true,
    delta: function() {
      return 16;
    },
  });

  example2.addEventListener('dCarousel:scroll', function() {
    count++;
    counter.textContent = count;
  });

}());


(function() {
  
  var root = document.documentElement;
  var getFontSize = function() {
    return parseFloat(window.getComputedStyle(root).fontSize.replace('px', ''),10);
  };
  var fontSize = getFontSize();
  
  dCarousel(document.querySelector('.d-carousel--example-3'), {
    delta: function() {
      return fontSize; // will count carousel item as showing when within 1rem of viewport
    },
    duration: function(args) {
      var diff = args.diff / (6.25 * fontSize);
      return (diff * 0.1) * 1000; // will scroll for +0.1s for every 6.25rem that needs to be moved
    },
  });

  window.addEventListener('resize', function() {
    fontSize = getFontSize();
  });

}());