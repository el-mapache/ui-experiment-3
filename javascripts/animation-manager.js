const running = [];

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
