const running = [];

// adapted from david walsh
const animations = {
  'animation': 'animationend',
  'MozAnimation': 'animationend',
  'WebkitAnimation': 'webkitAnimationEnd'
};

const transitions = {
  'transition': 'transitionend',
  'MozTransition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd'
};

const detectEventType = (searchObject) => {
  const el = document.createElement('fake');

  for (let event in searchObject){
    if (typeof el.style[event] !== 'undefined') {
      return searchObject[event];
    }
  }

  return null;
};

const animationEvent = detectEventType(animations);
const transitionEvent = detectEventType(transitions);

export let animator = {
  describeAnimation(name, fn, delay) {
    running.push(name);
  
    setTimeout(() => {
      fn();
      running.splice(running.indexOf(name), 1);
    }, delay);
  },

  animating(...animations) {
    if (!animations.length) return running.length;

    for (let a of animations) {
      if (running.indexOf(a) !== -1) {
        return true;
      }
    }

    return false;
  }
};
