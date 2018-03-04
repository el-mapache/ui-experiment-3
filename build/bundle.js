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

  delegateEvent(selector, fn, context = this) {
    return event => {
      const { target } = event;
      let parent = target.parentElement;

      while (parent !== this.el && parent !== null) {
        parent = parent.parentElement;
      }

      if (!parent) {
        return;
      }

      fn.call(context, event);
    };
  }

  bindEvents(descriptors) {
    descriptors.forEach(eventObject => {
      const { event, target, handlers, context } = eventObject;
      const events = Array.isArray(event) ? event : [event];

      handlers.forEach(fn => {
        const delegatedFn = this.delegateEvent(target, fn, context);

        events.forEach(type => this.el.addEventListener(type, delegatedFn));
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(15);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_project_data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_image_preloader__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_project_view__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_carousel__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_image_view__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_carousel_item__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_animation_manager__ = __webpack_require__(14);









const stateManager = {
  currentIndex: 0,
  currentProject: __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */][0],
  onNextItem(index) {
    this.currentIndex = index;
    this.currentProject = __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */][index];

    projectView.update(this.currentProject);
  },
  getNextProject() {
    const { currentIndex } = this;

    this.currentIndex = currentIndex === __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */].length - 1 ? 0 : currentIndex + 1;

    const project = __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */][this.currentIndex];

    projectView.update(project);
  }
};

const carouselEl = document.querySelector('.carousel');
const carousel = new __WEBPACK_IMPORTED_MODULE_3_carousel__["a" /* default */]({
  el: carouselEl,
  sources: __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */].map(project => project.src),
  props: {
    onAdvance: stateManager.onNextItem,
    children: __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */].map((project, index) => {
      const active = index === __WEBPACK_IMPORTED_MODULE_0_project_data__["a" /* default */].length - 1 ? 'active' : '';
      return Object(__WEBPACK_IMPORTED_MODULE_5_carousel_item__["a" /* default */])({
        classes: active,
        children: Object(__WEBPACK_IMPORTED_MODULE_4_image_view__["a" /* default */])({ src: project.src })
      });
    })
  },
  animator: __WEBPACK_IMPORTED_MODULE_6_animation_manager__["a" /* animator */]
});

const projectView = new __WEBPACK_IMPORTED_MODULE_2_project_view__["a" /* default */]({
  el: document.querySelector('.project-view'),
  project: stateManager.currentProject,
  onNextProject: stateManager.getNextProject.bind(stateManager),
  animator: __WEBPACK_IMPORTED_MODULE_6_animation_manager__["a" /* animator */]
});

new __WEBPACK_IMPORTED_MODULE_1_image_preloader__["a" /* default */]({
  imageSelector: 'img',
  containerNode: document,
  options: {}
}).then(preloadFn => {
  carousel.render();
  projectView.render();
  preloadFn();
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const projects = [{
  "name": "ratings",
  "tech": "ruby on rails, angular, postgresql",
  "blurb": "San Francisco restaurant cleanliness scores",
  "description": "ratings (pronounced RAT-ings) uses data from the city of San Francisco's health department to display an interactive map of restaurants in the city and their food safety inspection scores.<br><br>Users can move around the map and automatically get a list of restaurants near the area in which they are dragging, or they can search for their favorite restaurants.<br><br>Businesses are given a score of zero to four rats depending on the severity of their violations.  Historical scores and violations are provided as well as whether or not those violations remain unresolved.<br><br>The backend is straightforward, using Rails and Postgres to expose a simple REST API, consumed by a single page angular js front end.<br><br>In addition to trying to explore public data in a novel way, I used this project as an exercise to familiarize myself with angular.",
  "uri": "http://ratings.availableforfriendship.com",
  "repo": "https://github.com/el-mapache/caveat",
  "src": "rats.jpg",
  "available": true,
  color: 'lipstick'
}, {
  "name": "Libre Ipsum",
  "tech": "sinatra, redis, jquery",
  "blurb": "Placeholder text generated from Project Gutenberg",
  "description": "Libre Ipsum uses Project Gutenberg to generator placeholder text suitable for mockups or high-fidelity wireframes. The user simply chooses a book and a number of paragraphs; text from the book is chosen at random.<br><br>The application is composed of the following pieces:<br><br>1) A set of command line utilities handles parsing the Project Gutenberg RSS feed of new books, crawling the website to download them, and performing updating the registry of books<br><br>2). a simple Sinatra application that exposes an API providing paragraphs from the books and has an internal library to generate usable placeholder text (ignoring things like indicies, table of contents, images, etc). This was the most challenging part of writing the app, as it involved a lot of trial and error (and regular expressions!) to figure out the different permutations of invalid content.<br><br>3). a Redis database for simple IP based request throttling. The book parsing can be intensive depending on the book's contents, so it seemed prudent to limit the number of requests. <br><br>4). The front-end, which are some simple event handlers in jQuery/vanilla JS. The copy-to-clipboard functionality used a Flash library, but I recently re-implemented it using the relatively recent browser-based clipboard API.<br><br>",
  "uri": "http://libre-ipsum.availableforfriendship.com",
  "repo": "https://github.com/el-mapache/libre-ipsum",
  "src": "ipsum-2.jpg",
  "available": true,
  color: 'purple'
}, {
  "name": "Encoder",
  "tech": "express, redis, angular, ffmpeg",
  "blurb": "ffmpeg-backed audio transcoder",
  "description": "Encoder is a single-page application that allows the user to convert audio files of one format into another one, e.g. from WAV to mp3. Audio files submitted by the user are stored on server until processed by ffmpeg; at that point then the original files are removed, and an email is sent to the user with a download URL.<br><br>This was my first 'web app', and although the functionality is fairly simple, it taught me quite a bit about the considerations that go into making a single page app used by multiple concurrent client. For example, using a worker queue to handle processing the audio files, sending out emails, and removing the old files stored on the server. Or, using Redis as a volatile store for the download links (which expired after a 24 hour period). Even the idea of having a single source of truth to derive the front-end's state was something I had to learn while untangling the jQuery that drove it. <br><br>I later rewrote the server to use express (instead of a custom Node implementation) and angular to replace the jQuery.",
  "uri": "",
  "repo": "https://github.com/el-mapache/encode",
  "src": "encoder.jpg",
  "available": false,
  color: 'blue'
}, {
  "name": "Transmission",
  "tech": "express, redis, backbone",
  "blurb": "Real-time file streaming between multiple peers",
  "description": "Transmission takes inspiration from a chat room, with files being the medium of communication between connected clients. One client creates a room and shares that URL with other parties. In the room, every user can then drag as many files as they wish into their browsers and stream them to each of the other connected users. Files will wait to stream until there is at least one other user, and all files are transmitted using a LIFO queue. <br><br>The app uses Redis to keep track of the rooms, and utilizes the BinaryJS to handle transmitting binary data to and from the server over websockets. The front-end is written in backbone, using web sockets on the client side and the File API to extract metadata from, and assemble binary data into files, which are automatically downloaded to the user's computer.",
  "uri": "",
  "repo": "https://github.com/el-mapache/transmission",
  "src": "transmission-2.jpg",
  "available": false,
  color: 'blue'
}, {
  "name": "SC-Now Recorder",
  "tech": "vanilla javascript",
  "blurb": "Record module for SourceNow browser-based audio app",
  "description": "This project was written to drive SCNow, Source-Elements' web-based professional audio collaboration tool. Although I used Matt Diamond's excellent RecorderJS library as a starting point, new pieces of functionality had to be added to meet the project's requirements. Users needed to be able to record up to 90 minutes of uncompressed 2 channel PCM audio, and the app had to do so without causing the computer's fan to kick in (adding unwanted noise to the recording).<br><br>Solving this required two major components. Rather than store all the current audio data in a single buffer in memory, I used a small circular buffer which periodically (every few seconds) read data from the buffer and passed it to a web worker, where it was stored in a temporary file via the FileSystem API. When the recording was finished, a header was computed using the total length of the audio data contained in all the files, and those files were concatenated together into a single Blob object.<br><br>Doing this allowed longer record times because it was no longer necessary to store the complete audio data in runtime memory during recording, and because the complete audio data was kept in memory only once, when the file was being assembled.",
  "uri": "https://now.source-elements.com/#!/",
  "repo": "https://github.com/el-mapache/cassette",
  "src": "scnow.jpg",
  "available": true,
  color: 'purple'
}, {
  "name": "Hero Quest",
  "tech": "crafty",
  "blurb": "JS versions of Milton Bradley's 90s board game",
  "description": "JavaScript implementation of HeroQuest, a cool Warhammer-lite miniatures-based board game from the 90s. The biggest challenge with this project was one of scope; it taught me that you absolutely must plan out a large project before starting to build it!<br><br>The game's systems are managed by a completely modular architecture. Each of them, down to whether or not a game object can take damage, move, or behave as a ‘solid’ are composed of small, single-purpose modules. This allowed for a lot flexibility in behavior; for example, furniture could easily be made to take damage, or magical items could have their properties decorated, without needing a convoluted system of inheritance.<br><br>Complex behaviors are further abstracted into reusable interfaces. The game also includes a small script evaluator to handle item and magic usage, and custom events that may occur in a given level.<br><br>Although I didn't end up finishing the game, I learned a lot along the way, implementing algorithms like recasting, A* pathfinding, and flood fill, learning about data structures like linked lists, and building a project using an architectural paradigm different from ones I had used before.",
  "uri": "",
  "repo": "https://github.com/el-mapache/hero_quest",
  "src": "hero-quest-2.jpg",
  "available": false,
  color: 'lipstick'
}, {
  "name": "Minesweeper",
  "tech": "react",
  "blurb": "Minesweeper just like your Windows 3.1 used to make",
  "description": "JavaScript implementation of the classic game, written to teach myself react. The game only consists of a handful of components, a floodfill class, and some state managed via the Flux pattern.<br><br>There isn't much to say about this project because react made it extremely simple to write! This game is still very hard to beat.",
  "uri": "https://el-mapache.github.io/minesweeper",
  "repo": "https://github.com/el-mapache/minesweeper",
  "src": "minesweeper-2.jpg",
  "available": true,
  color: 'purple'
}, {
  name: 'Portfolio',
  tech: 'es6, css3, scss',
  blurb: 'My website!',
  description: 'The website you are currently viewing! Included because it represents a significant reworking of my previous portfolio site. Written to exercise my front-end chops a bit, there are a lot of changes under the hood.<br><br> I removed Bootstrap and replaced it with a layout driven by flexbox and CSS grid layout, both of which make laying out a page extremely simple. The inline script tag templates and parser are also removed, replaced with ES6 template strings. The page also makes greater use of CSS animations. The javascript driving the site is organized into view components, with a top level controller to hold state and provide callbacks and data to the views.',
  uri: 'https://availableforfriendship.com',
  repo: 'https://github.com/el-mapache/website-4.0',
  src: 'portfolio.jpg',
  available: 'true',
  color: 'purple'
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
    icon.src = 'images/preloader.gif';
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_view__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_templates_project_template__ = __webpack_require__(7);



class ProjectView extends __WEBPACK_IMPORTED_MODULE_0_simple_view__["a" /* default */] {
  constructor({ el, project, onNextProject, animator }) {
    super({ el });

    this.animator = animator;
    this.animating = false;
    this.project = project;
    this.fragment = this.generateDOM(Object(__WEBPACK_IMPORTED_MODULE_1_templates_project_template__["a" /* default */])(project));

    this.shouldCycle = this.shouldCycle.bind(this);

    this.el.addEventListener('click', this.shouldCycle);
    this.el.addEventListener('touchstart', this.shouldCycle);
  }

  shouldCycle(event) {
    if (event.target.classList.contains('project-cycle')) {
      onNextProject();
    }
  }

  willUpdate(nextProject) {
    const { src, description, blurb, tech, name } = nextProject;

    this.previousFragment = this.fragment;
    this.fragment = this.generateDOM(Object(__WEBPACK_IMPORTED_MODULE_1_templates_project_template__["a" /* default */])(nextProject));

    this.render();
  }

  render() {
    if (!this.previousFragment) {
      this.el.innerHTML = '';
      this.el.appendChild(this.fragment);
    } else {
      if (this.animator.animating('scaleInNextProject', 'scaleOutLastProject')) {
        return;
      }

      this.animator.describeAnimation('scaleInNextProject', () => {
        const nextChild = this.fragment.firstElementChild;
        let oldChild = this.el.firstElementChild;

        nextChild.classList.add('scale-in', 'backing-project-view');
        this.el.appendChild(this.fragment);

        oldChild.classList.add('backing-project-view', 'scale-out');

        window.scrollTo(0, 0);

        this.animator.describeAnimation('scaleOutLastProject', () => {
          this.el.removeChild(oldChild);
          nextChild.classList.remove('backing-project-view', 'scale-in');
          nextChild.querySelector('.project-contents').classList.add('slide-in-left');

          oldChild = null;
        }, 500);
      }, 280);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ProjectView);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const projectTemplate = ({ src, description, name, blurb, tech, uri, repo, available, color }) => {
  return `
      <article class="project-view-content ${color}">
        <div class="project-title">
          <div class="project-contents">
            <button type="button" role="nav" class="project-cycle btn right">
              Next Project
            </button>
            <h1 class="name">${name}</h1>
            <h4 class="tech">${tech}</h4>
            <div class="project-links">
              <a class="link" href="${repo}" target="_blank" rel="nofollow">code</a>
              ${available ? `<a class="link" href="${uri}" target="_blank" rel="nofollow">demo</a>` : ''}
            </div>
            <h5 class="blurb">${blurb}</h5>
            <p class="description">${description}</p>
            <button type="button" role="nav" class="project-cycle btn">
              Next Project
            </button>
          </div>
        </div>
        <figure class="hero-image">
          <img src="images/${src}" />
        </figure>
      </article>
    `;
};

/* harmony default export */ __webpack_exports__["a"] = (projectTemplate);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_linked_list__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_view__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_templates_carousel_item__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_templates_carousel_template__ = __webpack_require__(11);





class Carousel extends __WEBPACK_IMPORTED_MODULE_1_simple_view__["a" /* default */] {
  constructor({ el, sources, props = {}, animator }) {
    super({ el });

    this.props = props;
    this.fragment = this.compileTemplate(sources);
    this.track = this.fragment.querySelector('.carousel-track');
    this.items = this.generateItemList(this.fragment.querySelectorAll('.slideable'));
    this.handleAdvance = this.handleAdvance.bind(this);
    this.animator = animator;

    this.bindEvents([{
      event: ['click', 'touchstart'],
      target: 'controls',
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

      return Object(__WEBPACK_IMPORTED_MODULE_2_templates_carousel_item__["a" /* default */])({ src, classes, index });
    });

    return this.generateDOM(Object(__WEBPACK_IMPORTED_MODULE_3_templates_carousel_template__["a" /* default */])(imageList));
  }

  generateItemList(nodeList) {
    const list = new __WEBPACK_IMPORTED_MODULE_0_linked_list__["a" /* List */]();

    for (const node of nodeList) {
      list.add(node);
    }

    return list;
  }

  // get next item in linked list of slideable elements
  nextItem() {
    return this.items.next();
  }

  // get the current item in the linked list of slideable elements
  currentItem() {
    return this.items.lastAccessed();
  }

  handleAdvance(event) {
    event.preventDefault();

    if (this.animator.animating()) {
      return;
    }

    const { props } = this;
    const activeItem = this.currentItem();
    const currentItem = this.nextItem();
    const nextItem = this.nextItem();

    currentItem.style.setProperty('order', 1);
    nextItem.style.setProperty('order', 2);

    for (let i = 2; i < this.items.length; i++) {
      this.nextItem().style.setProperty('order', i + 1);
    }

    // advance the current item in the list one more time
    // so we don't keep looping over the same elements ad nauseum        
    this.nextItem();

    this.track.classList.remove('fixed');
    activeItem.classList.remove('pivot');
    currentItem.classList.add('scale-out', 'pivot');

    this.animator.describeAnimation('filter', () => {
      nextItem.classList.add('current-item');
      nextItem.classList.remove('inactive');
    }, 150);

    props.onAdvance(nextItem.getAttribute('data-index'));

    this.animator.describeAnimation('stopCarousel', () => {
      this.track.classList.add('fixed');
    }, 0);

    this.animator.describeAnimation('hideLastItem', () => {
      currentItem.classList.remove('current-item', 'scale-out');
    }, 700);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Carousel);

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const carouselItem = ({ src, classes, index }) => {
  const finalClasses = `slideable ${classes}`;

  return `
      <li data-index=${index} class="${finalClasses}">
        <img src="images/${src}" />
      </li>
    `;
};

/* harmony default export */ __webpack_exports__["a"] = (carouselItem);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const carouselTemplate = images => {
  return `<div class="carousel-container">
        <ul class="carousel-track fixed">
          ${images.join('')}
        </ul>
      </div>
      <svg role="button" class="arrow-icon carousel-control" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 476.213 476.213" style="enable-background:new 0 0 476.213 476.213;" xml:space="preserve" preserveAspectRatio="xMidYMin">
        <polygon points="405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 
          405.606,308.713 476.213,238.106 "/>
      </svg> 
    </div>
  `;
};

/* harmony default export */ __webpack_exports__["a"] = (carouselTemplate);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pure_component__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_pure_component__["a" /* default */])(props, ({ src, classes }) => {
    const classAttr = classes ? `class="${classes}"` : '';

    return `<img ${classAttr} src="images/${src}" />`;
  });
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pure_component__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_pure_component__["a" /* default */])(props, ({ classes, children }) => {
    const finalClasses = `slideable${classes}`;

    return `
        <li class="${finalClasses}">
          ${children}
        </li>
      `;
  });
});;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return animator; });
const running = [];

let animator = {
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

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);