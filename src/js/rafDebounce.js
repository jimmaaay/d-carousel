export default () => {

  let raf = false;

  const debouncer = (callback) => {
    if (!raf) {
      raf = true;
      requestAnimationFrame((timestamp) => {
        callback(timestamp);
        raf = false;
      });
    }
  };

  return debouncer;

};