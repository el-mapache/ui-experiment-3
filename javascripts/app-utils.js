export const debounce = (fn, delayTime, immediate) => {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;
      fn.apply(null, args);
    };
    const callNow = !timeout && immediate ? true : false;

    clearTimeout(timeout);
    timeout = setTimeout(later, delayTime);
    
    if (callNow) {
      fn.apply(null, args);
    }
  };
};

export const throttle = (callback, wait, context = this) => {
  let timeout;
  let last = 0;
  let fnArgs;

  const later = () =>  callback.apply(context, fnArgs); 

  return (...args) => {
    const now = +new Date;
    if (!last || (now > (last + wait))) {
      last = now;
      callback.apply(context, args);
    } else {
      clearTimeout(timeout);
      fnArgs = args;
      last = now;
      timeout = setTimeout(later, wait);
    }
  };
};
