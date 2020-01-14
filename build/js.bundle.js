/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SimpleView {
  constructor({ el }) {
    this.el = el;
  }

  delegateEvent(selector, fn) {
    return event => {
      const { target } = event;
      // Could also maybe search for the child element? seems like
      // too much overhead though
      if (target.id === selector || target.classList.contains(selector)) {
        fn.call(this);
      }
    };
  }

  bindEvents(descriptors) {
    descriptors.forEach(eventObject => {
      const { event, target, handlers } = eventObject;

      handlers.forEach(fn => {
        const delegatedFn = this.delegateEvent(target, fn);
        this.el.addEventListener(event, delegatedFn);
      });
    });
  }

  generateDOM(templateString) {
    const range = document.createRange();

    return range.createContextualFragment(templateString);
  }

  update(props) {
    this.willUpdate && this.willUpdate(props);
  }

  // pass in the fragment maybe?
  // maaaaybe I can use the idea of render props
  /**
   * pass a function called render to my components,
   * and have SimpleView.render just call that method. no
   * pass a function that takes props and returns a template,
   * then have SimpleView.render accept that template and render it
   * 
   * myTemplateBuilder = ({ prop1, prop2 }) => `${prop2} ${prop1}`
   * E.G. new Carousel({ el, props: {
   *  callback1,
   *  () => {
   *    function that does template magic with props and returns template string
   *  }
   * } })
   * 
   * 
   * PureTemplate()
   */

  /**
   * actually for now, I just need to make a ImageView component,
   * and a CarouselItem component, and have those both be simple views with
   * their own templates and props.
   */
  // make a view factory?? i need a way to pass new data into the views,
  // have them recompile their templates and schedule a render in
  // requestAnimationFrame (maybe).
  render() {
    const html = this.fragment || document.createElement('span');

    this.el.innerHTML = '';
    this.el.appendChild(html);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SimpleView);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const pureComponent = (props = {}, template) => {
  const templateString = template(props);

  return {
    props,
    dom: createDOM(templateString)
  };
};

const createDOM = templateString => {
  const range = document.createRange();

  return range.createContextualFragment(templateString);
};

/* harmony default export */ __webpack_exports__["a"] = (pureComponent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_preloader__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_view__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__carousel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_view__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__carousel_item__ = __webpack_require__(10);








const stateManager = {
  currentProject: __WEBPACK_IMPORTED_MODULE_1__project_data__["a" /* default */][0],
  onNextItem(index) {
    this.currentProject = __WEBPACK_IMPORTED_MODULE_1__project_data__["a" /* default */][index];
    const {
      file: src,
      description,
      name,
      tech,
      blurb
    } = this.currentProject;

    projectView.update({
      src,
      description,
      name,
      tech,
      blurb
    });
  }
};

const carouselEl = document.querySelector('.carousel');
const carousel = new __WEBPACK_IMPORTED_MODULE_4__carousel__["a" /* default */]({
  el: carouselEl,
  sources: __WEBPACK_IMPORTED_MODULE_1__project_data__["a" /* default */].map(project => project.file),
  props: {
    onAdvance: stateManager.onNextItem,
    children: __WEBPACK_IMPORTED_MODULE_1__project_data__["a" /* default */].map((project, index) => {
      const active = index === __WEBPACK_IMPORTED_MODULE_1__project_data__["a" /* default */].length - 1 ? 'active' : '';
      return Object(__WEBPACK_IMPORTED_MODULE_6__carousel_item__["a" /* default */])({
        classes: active,
        children: Object(__WEBPACK_IMPORTED_MODULE_5__image_view__["a" /* default */])({ src: project.file })
      });
    })
  }
});

const projectView = new __WEBPACK_IMPORTED_MODULE_3__project_view__["a" /* default */]({
  el: document.querySelector('.project-view'),
  project: stateManager.currentProject
});

new __WEBPACK_IMPORTED_MODULE_2__image_preloader__["a" /* default */]({
  imageSelector: 'img',
  containerNode: document,
  options: {}
}).then(preloadFn => {
  carousel.render();
  projectView.render();
  preloadFn();
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const projects = [{
  "name": "RATings",
  "tech": "ruby on rails, angular, postgresql",
  "blurb": "San Francisco restaurant cleanliness scores",
  "description": "RATings (pronounced RAT-ings) uses data from the city of San Francisco's health department to display an interactive map of restaurants in the city and their food safety inspection scores. Businesses are given a score of zero to four rats depending on the severity of their violations.  Historical scores and violations are provided as well as the status of the violations. The backend uses Rails to expose a simple API that feeds an Angular js front-end. This project was undertaken as an exercise in learning Angular js and to explore public data in a novel way.",
  "uri": "http://ratings.availableforfriendship.com",
  "repo": "https://github.com/el-mapache/caveat",
  "file": "rats.jpg",
  "available": true
}, {
  "name": "Libre Ipsum",
  "tech": "sinatra, redis, jquery",
  "blurb": "Placeholder text generated from Project Gutenberg",
  "description": "Libre Ipsum is a placeholder text generator that pulls material from Project Gutenberg, an online repository of books in the public domain. It fetches and parses a daily RSS feed that contains the latest books added to Project Gutenberg. The user chooses a book and a number of paragraphs; text from the book is displayed randomly. The backend is comprised of several pieces: a small Sinatra application to handle requests and process the books, a Redis database for simple IP based request throttling, and a text file which serves as a manifest of all available books. The front-end is written in jQuery.",
  "uri": "http://libre-ipsum.availableforfriendship.com",
  "repo": "https://github.com/el-mapache/libre-ipsum",
  "file": "ipsum-2.jpg",
  "available": true
}, {
  "name": "Encoder",
  "tech": "express, redis, angular, ffmpeg",
  "blurb": "ffmpeg-backed audio transcoder",
  "description": "The first web app I created, Encoder is an audio transcoder that allows users to upload an audio file and convert it to one of several different formats. The file is processed using ffmpeg and an email is sent to the user with a link to the converted file. It uses Redis and a queueing library to manage file conversion and email jobs. This application was recently rewritten in Express from pure Node, with Angular providing the front-end functionality.",
  "uri": "",
  "repo": "https://github.com/el-mapache/encode",
  "file": "encoder.jpg",
  "available": false
}, {
  "name": "Transmission",
  "tech": "express, backbone",
  "blurb": "Real-time file streaming between multiple peers",
  "description": "Using Node's binary websocket library BinaryJS, this application allows for real-time file streaming from one connected client to each of the other connected clients. It chunks a file to the back-end server, and pipes the chunks to each client connection. Files are not stored on the server, they are assembled client-side and saved to the user's computer. The front-end is a small backbone application that utilizes the File API to recreate files from the original chunks of data.",
  "uri": "",
  "repo": "https://github.com/el-mapache/transmission",
  "file": "transmission-2.jpg",
  "available": false
}, {
  "name": "SC-Now Recorder",
  "tech": "angular",
  "blurb": "Record module for SourceNow browser-based audio app",
  "description": "Recorder module written for Source-Elements' web only audio collaboration tool. Based on Matt Diamond's excellent RecorderJS library, this module makes a number of modifications. Rather than recording storing all audio in a single buffer, it writes many small files (using Chrome's FileSystem API) and then assembles them into a single WAV file once the recording is complete. This allows audio files of any duration to be recorded and saved without consuming all of the user's system's resources. Originally written as a stand-alone demo, I adapted it into an Angular application for use with Source-Elements' existing front-end infrastructure.",
  "uri": "https://now.source-elements.com/#!/",
  "repo": "https://github.com/el-mapache/cassette",
  "file": "scnow.jpg",
  "available": true
}, {
  "name": "Hero Quest",
  "tech": "craftyjs",
  "blurb": "JS versions of Milton Bradley's 90s board game",
  "description": "A perpetual work in progress, this is a JavaScript implementation of one of my favorite boardgames as a kid. I wanted the experience of making a game, and the challenge of designing a large system composed of many smaller components. Character actions are added dynamically in the form of interfaces which wrap several components together, and a simple MVC structure glues together the user interface and the data models. This game includes implementations of A*, ray casting, and floodfill algorithms, generally adapted from Java or C to JavaScript.",
  "uri": "",
  "repo": "https://github.com/el-mapache/hero_quest",
  "file": "hero-quest-2.jpg",
  "available": false
}, {
  "name": "Minesweeper",
  "tech": "react",
  "blurb": "Minesweeper just like your Windows 3.1 used to make",
  "description": "I wrote this Javascript implementation of minesweeper to get more comfortable using React. A handful of components, a simple store to hold the state of the game, and an implementation of the floodfill algorithm are the only pieces needed to recreate the game. \n\n In case you were wondering, this game is still super annoying to play.",
  "uri": "https://el-mapache.github.io/minesweeper",
  "repo": "https://github.com/el-mapache/minesweeper",
  "file": "minesweeper-2.jpg",
  "available": true
}];

/* harmony default export */ __webpack_exports__["a"] = (projects);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function ImagePreloader({ imageSelector, containerNode, options = {} }) {
  const defaults = {
    delayTime: 350,
    delay: 100,
    fadeInTime: 700,
    wrapperNode: 'span'
  };
  const finalOpts = _extends({}, defaults, { options });
  const preloaderClass = 'preloader';
  const scope = containerNode;

  const pendingImages = function () {
    /**
      * create a list of boolean values, one for each image to be preloaded:
      * `true` if image has finished preloading, `false` otherwise
    */
    const list = [];

    return {
      isLoaded: () => list.every(item => item),
      set: (index, value) => list[index] = value,
      get: index => list[index]
    };
  }();

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

    setTimeout(function () {
      fn.apply(null, args);
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
    return function () {
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

      images.forEach(function (image, index) {
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

  return new Promise(resolve => {
    createPreloadIcon(function () {
      document.body.removeChild(this);
      resolve(start);
    });
  });
}

/* harmony default export */ __webpack_exports__["a"] = (ImagePreloader);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simple_view__ = __webpack_require__(0);

let count = 0;
const projectTemplate = ({ src, description, name, blurb, tech }) => {
  return ` 
      <article class="project-view-content">
        <div class="project-title">
          <h1 class="name">${name}</h1>
          <h4 class="tech">${tech}</h4>
          <h5 class="blurb">${blurb}</h5>
          <p class="description">${description}</p>
        </div>
        <figure class="hero-image">
          <img src="images/${src}" />
        </figure>
      </article>
    `;
};

class ProjectView extends __WEBPACK_IMPORTED_MODULE_0__simple_view__["a" /* default */] {
  constructor({ el, project }) {
    super({ el });

    this.project = project;
    this.fragment = this.generateDOM(projectTemplate({
      src: this.project.file,
      description: this.project.description,
      name: this.project.name,
      tech: this.project.tech,
      blurb: this.project.blurb
    }));
  }

  willUpdate({ src, description, blurb, tech, name }) {
    this.previousFragment = this.fragment;
    this.fragment = this.generateDOM(projectTemplate({
      src,
      description,
      blurb,
      tech,
      name
    }));

    this.render();
  }

  render() {
    if (!this.previousFragment) {
      this.el.innerHTML = '';
      this.el.appendChild(this.fragment);
    } else {
      setTimeout(() => {
        let oldChild = this.el.firstElementChild;

        this.fragment.firstElementChild.classList.add('scale-in', 'backing-project-view');
        this.el.appendChild(this.fragment);

        oldChild.classList.add('backing-project-view', 'scale-out');

        if (count % 2) {
          this.el.children[1].classList.add('blue');
        } else if (count % 3) {
          this.el.children[1].classList.add('purple');
        } else {
          this.el.children[1].classList.add('lipstick');
        }

        setTimeout(() => {
          this.el.removeChild(oldChild);
          this.el.firstElementChild.classList.remove('backing-project-view', 'scale-in');
          oldChild = null;
          count += 1;
        }, 700);
      }, 200);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ProjectView);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linked_list__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simple_view__ = __webpack_require__(0);



const imageTemplate = ({ src, classes, index }) => {
  const finalClasses = `slideable ${classes}`;

  return `
      <li data-index=${index} class="${finalClasses}">
        <img src="images/${src}" />
      </li>
    `;
};

const carouselTemplate = images => {
  return `<div class="carousel-container">
        <ul class="carousel-track fixed">
          ${images.join('')}
        </ul>
      </div>
      <svg role="button" class="arrow-icon carousel-control" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 476.213 476.213" style="enable-background:new 0 0 476.213 476.213;" xml:space="preserve">
        <polygon points="405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 
          405.606,308.713 476.213,238.106 "/>
      </svg>
    </div>
  `;
};

class Carousel extends __WEBPACK_IMPORTED_MODULE_1__simple_view__["a" /* default */] {
  constructor({ el, sources, props = {} }) {
    super({ el });

    this.props = props;
    this.fragment = this.compileTemplate(sources);
    this.track = this.fragment.querySelector('.carousel-track');
    this.items = this.generateItemList(this.fragment.querySelectorAll('.slideable'));
    this.handleAdvance = this.handleAdvance.bind(this);
    this.animating = false;

    this.bindEvents([{
      event: 'click',
      target: 'carousel-control',
      handlers: [this.handleAdvance]
    }]);
  }

  compileTemplate(sources) {
    const imageList = sources.map((src, index) => {
      let classes = '';

      if (!index) {
        classes = 'current-item';
      } else if (index === sources.length - 1) {
        classes = 'pivot';
      }

      return imageTemplate({ src, classes, index });
    });

    return this.generateDOM(carouselTemplate(imageList));
  }

  generateItemList(nodeList) {
    const list = new __WEBPACK_IMPORTED_MODULE_0__linked_list__["a" /* List */]();

    for (const node of nodeList) {
      list.add(node);
    }

    return list;
  }

  delegateEvent(selector, fn) {
    return event => {
      const { target } = event;

      if (target.id === selector || target.classList.contains(selector)) {
        fn.call(this);
      }
    };
  }

  nextItem() {
    return this.items.next();
  }

  currentItem() {
    return this.items.lastAccessed();
  }

  handleAdvance() {
    if (this.animating) {
      return;
    }

    const { props } = this;
    const activeItem = this.currentItem();
    const currentItem = this.nextItem();

    this.animating = true;

    this.track.classList.remove('fixed');
    activeItem.classList.remove('pivot');
    currentItem.classList.add('scale-out', 'pivot');
    currentItem.style.setProperty('order', 1);

    const nextItem = this.nextItem();
    nextItem.classList.add('current-item');
    nextItem.classList.remove('inactive');
    nextItem.style.setProperty('order', 2);

    props.onAdvance(nextItem.getAttribute('data-index'));

    for (let i = 2; i < this.items.length; i++) {
      this.nextItem().style.setProperty('order', i + 1);
    }

    // advance the current item in the list one more time
    // so we don't keep looping over the same elements ad nauseum        
    this.nextItem();

    setTimeout(() => {
      this.track.classList.add('fixed');
    }, 0); // delay this till the next stack frame

    setTimeout(() => {
      currentItem.classList.remove('current-item', 'scale-out');
      this.animating = false;
    }, 700); // magic number is amount of milliseconds of the scale-and-fade animation
  }
}

/**
 * click functionality
 * user clicks on image:
 * 
 * 1.lookup image at that index in the linked list
 * 2. set current node
 * 3. scroll carousel that many spaces - 1 (will only be max 2?)
 *    one issue is that the carousel scroll is coupled to the number of elements/the width
 *      might need a way to programatically specify?
 * run handle advance
 * 
 * So optimistically, the user clicks on the next image, call handle advance
 * otherwise, scroll the carousel left 1 element, then run handleAdvance
 * 
 * probably going to have to set the carousel-track transform using JS and inline style...
 */

/* harmony default export */ __webpack_exports__["a"] = (Carousel);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Node */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List; });
class Node {
  constructor({ value }) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }

  add(value) {
    const node = new Node({ value });
    if (!this.head) {
      this.head = node;
      this.current = this.head;
    }

    if (!this.tail) {
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.current = node;
    this.length += 1;
  }

  next() {
    const nextNode = this.current.next;

    if (nextNode === null) {
      this.current = this.head;
      return this.head.value;
    }

    this.current = nextNode;
    return nextNode.value;
  }

  get(index) {
    let node;
    let count = 0;

    while (count < index) {
      node = node.next;
      count += 1;
    }

    this.currentNode = node;
    return node;
  }

  lastAccessed() {
    return this.current.value;
  }

  first() {
    return this.head.value;
  }

  last() {
    return this.tail.value;
  }
}



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pure_component__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__pure_component__["a" /* default */])(props, ({ src, classes }) => {
    const classAttr = classes ? `class="${classes}"` : '';

    return `<img ${classAttr} src="images/${src}" />`;
  });
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pure_component__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__pure_component__["a" /* default */])(props, ({ classes, children }) => {
    const finalClasses = `slideable${classes}`;

    return `
        <li class="${finalClasses}">
          ${children}
        </li>
      `;
  });
});;

/***/ })
/******/ ]);