import BezierEasing from 'bezier-easing';
import rafDebounce from './rafDebounce';
import supportsPassive from './supportsPassive';

const defaultOptions = {
  outerSelector: '.j-carousel__outer',
  innerSelector: '.j-carousel__inner',
  itemsSelector: '.j-carousel__item',
  nextSelector: '.j-carousel__next',
  prevSelector: '.j-carousel__prev',
  easing: [0.42,0,0.58,1], // ease-in-out, used for animating the scroll
  delta: () => { // will count an item as fully in view if within ${x}px of delta
    return 8;
  },
};

const HALF_A_FRAME = 8;

let windowInnerWidth = window.innerWidth;

const debouncer = rafDebounce();
const windowResizeFns = [];
const windowResize = () => {
  debouncer(() => {
    windowInnerWidth = window.innerWidth;
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

  console.log(easing);
  window.easing = easing;

  let buttonStates = { // false is hidden, true is shown
    next: false,
    prev: false,
  };

  let innerWidth = $inner.offsetWidth;
  let itemWidth = $items[0].offsetWidth;
  let maxScrollLeft = innerWidth - windowInnerWidth;
  let scrollLeft;
  let animating = false;

  const outerScroll = () => {
    scrollLeft = $outer.scrollLeft;

    // button stuff
    if (buttonStates.prev === false && scrollLeft !== 0) {
      buttonStates.prev = true;
      $prev.style.opacity = 1;
    } else if (buttonStates.prev === true && scrollLeft === 0) {
      buttonStates.prev = false;
      $prev.style.opacity = 0;
    }
    
    if (buttonStates.next === false && scrollLeft !== maxScrollLeft) {
      buttonStates.next = true;
      $next.style.opacity = 1;
    } else if (buttonStates.next === true && scrollLeft === maxScrollLeft) {
      buttonStates.next = false;
      $next.style.opacity = 0;
    }
    
  };

  const outerScrollDebounced = () => {
    debouncer(outerScroll);
  };

  const scrollOuter = (x) => {
    animating = true;
    const diff = scrollLeft - x;
    const duration = 500; // needs to be worked out for the amount that is being scrolled. E.g 100px will always scroll in 0.1s
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
          $outer.scrollLeft = startingScrollLeft + Math.abs(xValue);
        }
        
      }
      
      if (lastTick === false) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick); 

  };

  windowResizeFns.push(() => {
    innerWidth = $inner.offsetWidth;
    itemWidth = $items[0].offsetWidth;
    maxScrollLeft = innerWidth - windowInnerWidth;
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
    const lastIndexFullyShowing = Math.floor((scrollLeft + windowInnerWidth + options.delta()) / itemWidth);
    if (lastIndexFullyShowing === noItems) return;
    const nextItem = lastIndexFullyShowing + 1;
    let x = (nextItem * itemWidth) - itemWidth;
    if (x + windowInnerWidth > innerWidth) x = innerWidth - windowInnerWidth;
    scrollOuter(x);
  });

  // outerScroll();


  


  outerScroll();

}






// const debouncer = rafDebounce();

// const jCarousel = Array.from(document.querySelectorAll('.j-carousel'));
// const itemWidthFns = [];
// let windowWidth = window.innerWidth;

// const windowResize = () => {
//     debouncer(() => {
//       itemWidthFns.forEach((fn) => fn());
//       windowWidth = window.innerWidth;
//     });
// };

// const setScrollLeft = ({
//   x,
//   outer,
//   inner,
// }) => {

 

// };


// jCarousel.forEach((el) => {
//   const outer = el.querySelector('.j-carousel__outer');
//   const inner = el.querySelector('.j-carousel__inner');
//   const items = Array.from(el.querySelectorAll('.j-carousel__item'));
//   const next = el.querySelector('.j-carousel__next');
//   const prev = el.querySelector('.j-carousel__prev');
//   const noItems = items.length;
//   let itemWidth = items[0].offsetWidth;
//   let innerWidth = inner.offsetWidth;

//   itemWidthFns.push(() => {
//     itemWidth = items[0].offsetWidth;
//     innerWidth = inner.offsetWidth;
//   });

//   prev.addEventListener('click', () => {

//   });

//   next.style.opacity = 1;

//   next.addEventListener('click', () => {
//     const noFullyShowing = Math.floor((outer.scrollLeft + windowWidth) / itemWidth);
//     if (noFullyShowing === noItems) return;
//     const nextItem = noFullyShowing + 1;
//     let x = (nextItem * itemWidth) - itemWidth;
//     if (x + windowWidth > innerWidth) x = innerWidth - windowWidth;
//     setScrollLeft({
//       x,
//       outer,
//       inner,
//     });

//   });

// });


// window.addEventListener('resize', windowResize, false);