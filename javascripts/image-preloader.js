function ImagePreloader({ imageSelector, containerNode, options = {} }) {
  const defaults = {
    delayTime: 350,
    delay: 100,
    fadeInTime: 700,
    wrapperNode: 'span',
  };
  const finalOpts = { ...defaults, options };
  const preloaderClass = 'preloader';
  const scope = containerNode;

  const pendingImages = (function() {
    /**
      * create a list of boolean values, one for each image to be preloaded:
      * `true` if image has finished preloading, `false` otherwise
    */
    const list = [];

    return {
      isLoaded: () => list.every(item => item),
      set: (index, value) => list[index] = value,
      get: index => list[index],
    };
  })();

  var icon;
  var timer;
  var images;

  function isImage(node) {
    return node.tagName.toLowerCase() === 'img';
  }

  // @returns {Array} Array of a single HTMLElement
  function prepareImage(imgNode, loadedIndex) {
    setImageStyle(imgNode);
    wrap(imgNode);
    pendingImages.set(loadedIndex, false);

    return [imgNode];
  }

  // Find each image node, set its styles and wrap it.
  function getImages(imageSelector, parentSelector = document) {
    const imageNodes = parentSelector.querySelectorAll('img');

    // Preloader was initialized with a single image
    if (imageNodes.length === 1) {
      return prepareImage(node, 0);
    }

    return [].reduce.call(imageNodes, (accum, node, index) => {
      return [...accum, ...prepareImage(node, index)];
    }, []);
  }

  function setImageStyle(img) {
    img.style.visibility = 'hidden';
    img.className = img.className + ' hide-node';
  }

  function wrap(node) {
    var wrapper = document.createElement(finalOpts.wrapperNode);
    wrapper.className = preloaderClass;

    var parent = node.parentNode;

    parent.insertBefore(wrapper, node);
    wrapper.appendChild(node);
  }

  // Preload the preload icon;
  function createPreloadIcon(callback) {
    var icon = document.createElement('img');

    icon.onload = callback;
    icon.style.display = 'none';
    icon.src = '../images/preloader.gif';
    document.body.appendChild(icon);
  }

  function delayedFn(timeout, fn) {
    var args = [].slice.call(arguments, 2);

    setTimeout(function() {
      fn.apply(null, args)
    }, timeout);
  }

  function removeClass(node, className) {
    const classNameRegex = new RegExp(`\\s*${className}`);

    node.className = node.className.replace(classNameRegex, '');
  }

  function removePreloadClass(imageNode) {
    removeClass(imageNode.parentNode, preloaderClass);
    removeClass(imageNode, 'hide-image');
  }

  function onShowImage(image) {
    return function() {
      image.className = image.className + ' show-node';
      delayedFn(finalOpts.fadeInTime, removePreloadClass, image);
    };
  }

  function showImage(image, delayTime) {
    image.style.visibility = 'visible';

    delayedFn(delayTime, onShowImage(image));
  }

  const imageIsLoaded = image => typeof image !== 'undefined' && image.complete;

  function startPreloader(images) {
    var timer;
    var images = images.slice(0);
    var localDelay = finalOpts.delayTime;

    function isImagePreloaded() {
      // All images have been loaded.
      if (pendingImages.isLoaded()) {
        return;
      }

      images.forEach(function(image, index) {
        if (imageIsLoaded(image) && !pendingImages.get(index)) {
          pendingImages.set(index, true);
          localDelay += finalOpts.delay;

          showImage(image, localDelay);
        }
      });

      window.requestAnimationFrame(isImagePreloaded);
    }

    window.requestAnimationFrame(() => {
      isImagePreloaded();
    });
  }

  function start() {
    startPreloader(getImages(imageSelector));
  }

  /**
    * Initialization
  **/
  
  return new Promise((resolve) => {
    createPreloadIcon(function() {
      document.body.removeChild(this);
      resolve(start);
    });
  });
}

export default ImagePreloader;
