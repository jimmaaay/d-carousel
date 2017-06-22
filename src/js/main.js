import BezierEasing from 'bezier-easing';
import rafThrottle from './rafThrottle';
import supportsPassive from './supportsPassive';

const defaultOptions = {
  container: window, // container is used to determine the width of the carousel. As most likely use case is full with use window
  paddingLeft: false, // if set to true then script will check outer element for a padding left value which offsets the carousel items. Much like googles one on desktop
  outerSelector: '.j-carousel__outer',
  innerSelector: '.j-carousel__inner',
  itemsSelector: '.j-carousel__item',
  nextSelector: '.j-carousel__next',
  prevSelector: '.j-carousel__prev',
  easing: [0.42,0,0.58,1], // ease-in-out, used for animating the scroll. See https://github.com/gre/bezier-easing for options
  delta: () => { // will count an item as fully in view if within ${x}px of delta
    return 8;
  },
  duration: () => { // possibly needs to be worked out for the amount that is being scrolled. E.g 100px will always scroll in 0.1s
    return 500;
  },
};

const HALF_A_FRAME = 8; // Around half of a frame, based on 60fps as most common frame rate


const throttler = rafThrottle();
const windowResizeFns = [];
const windowResize = () => {
  throttler(() => {
    windowResizeFns.forEach((fn) => fn());
  });
}

let init = false;



export default function jCarousel(el, optionsArg) {

  const options = Object.assign({}, defaultOptions, optionsArg);
  const $outer = el.querySelector(options.outerSelector);
  const $inner = el.querySelector(options.innerSelector);
  const $items = Array.from(el.querySelectorAll(options.itemsSelector));
  const $next = el.querySelector(options.nextSelector);
  const $prev = el.querySelector(options.prevSelector);
  const noItems = $items.length;
  const easing = BezierEasing.apply(null, options.easing);

  let containerWidth = options.container === window ? options.container.innerWidth : options.container.offsetWidth;
  let paddingLeft = options.paddingLeft ? parseFloat(window.getComputedStyle($outer).paddingLeft.replace('px', ''), 10) : 0;
  let innerWidth = $inner.offsetWidth;
  let itemWidth = $items[0].offsetWidth;
  let maxScrollLeft = innerWidth - containerWidth + paddingLeft;
  let scrollLeft;
  let animating = false;
  
  const outerScroll = () => {
    scrollLeft = $outer.scrollLeft;

    // button stuff
    if (scrollLeft !== 0) {
      $prev.classList.remove('disabled');
    } else if (scrollLeft === 0) {
      $prev.classList.add('disabled');
    }
    
    // minus 1 as if scrollLeft is a decimal then it may not be possible to fully match the maxScrollLeft. 
    // So instead we will aim to be within 1px of the maxScrollLeft
    if (scrollLeft < maxScrollLeft - 1) {
      $next.classList.remove('disabled');
    } else if (scrollLeft >= maxScrollLeft - 1) {
      $next.classList.add('disabled');
    }
    
  };

  const outerScrollDebounced = () => {
    throttler(outerScroll);
  };

  const scrollOuter = (x) => {

    animating = true;
    const diff = scrollLeft - x;

    const duration = options.duration({
      itemWidth,
      containerWidth,
      diff: Math.abs(diff),
    });
    
    const startingScrollLeft = scrollLeft;
    let start = false;
    const tick = (timestamp) => {
      const lastTick = start === false ? false : ((timestamp - start) + HALF_A_FRAME) >= duration;
      if (start === false) {
        start = timestamp;
      } else {
        if (lastTick) {
          $outer.scrollLeft = x;
          animating = false;
        } else {
          const msDiff = timestamp - start; // ms difference between current frame and last one
          const percentage = easing(msDiff / duration); // the percentage of x that should to be scrolled to
          const xValue = diff * percentage; // x value that scrollLeft should be

          if (diff < 0) { // going to the right
            $outer.scrollLeft = startingScrollLeft + Math.abs(xValue);
          } else { // going to the left
            $outer.scrollLeft = startingScrollLeft - xValue;
          }
          
        }
        
      }
      
      if (lastTick === false) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick); 

  };

  windowResizeFns.push(() => {
    containerWidth = options.container === window ? options.container.innerWidth : options.container.offsetWidth;
    paddingLeft = options.paddingLeft ? parseFloat(window.getComputedStyle($outer).paddingLeft.replace('px', ''), 10) : 0;
    innerWidth = $inner.offsetWidth;
    itemWidth = $items[0].offsetWidth;
    maxScrollLeft = innerWidth - containerWidth + paddingLeft;  
    outerScroll();
  });

  if (init === false) {
    init = true;
    // only add event listener if jCarousel is called at least once
    window.addEventListener('resize', windowResize, false);
  }

  $outer.addEventListener('scroll', outerScrollDebounced, supportsPassive ? { passive: true } : false);

  $next.addEventListener('click', () => {
    if (animating === true) return;
    const start = 0 - paddingLeft;
    const lastIndexFullyShowing = Math.floor((start + scrollLeft + containerWidth + options.delta()) / itemWidth);
    if (lastIndexFullyShowing === noItems) {
      scrollOuter(maxScrollLeft);
      return;
    }
    const nextItem = lastIndexFullyShowing + 1;
    const x = Math.abs(start) + Math.min((nextItem * itemWidth) - itemWidth, innerWidth - containerWidth);
    scrollOuter(x);
  });

  $prev.addEventListener('click', () => {
    if (animating === true) return;
    const start = 0 - paddingLeft;
    const firstItemFullyShowing = Math.ceil((start + scrollLeft - options.delta()) / itemWidth) + 1;
    if (firstItemFullyShowing === 1) {
      scrollOuter(0);
      return;
    }
    const prevItem = firstItemFullyShowing - 1;
    const x = Math.abs(start) + Math.max((prevItem * itemWidth) - containerWidth, start);
    scrollOuter(x);
  });

  // run this function on init to work out the button states
  outerScroll();

}