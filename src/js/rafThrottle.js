export default () => {

  let raf = false;

  const throttler = (callback) => {
    if (!raf) {
      raf = true;
      requestAnimationFrame((timestamp) => {
        callback(timestamp);
        raf = false;
      });
    }
  };

  return throttler;

};