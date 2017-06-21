// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
// Test via a getter in the options object to see if the passive property is accessed
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {}

export default supportsPassive;