import { List } from 'linked-list';
import SimpleView from 'simple-view';

const imageTemplate = ({ src, classes, index }) => {
  const finalClasses = `slideable ${classes}`;
 
  return (
    `
      <li data-index=${index} class="${finalClasses}">
        <img src="images/${src}" />
      </li>
    `
  );
};

const carouselTemplate = (images) => {
  return (
    `<div class="carousel-container">
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
  `);
};

class Carousel extends SimpleView {
  constructor({ el, sources, props = {} }) {
    super({ el });

    this.props = props;
    this.fragment = this.compileTemplate(sources);
    this.track = this.fragment.querySelector('.carousel-track')
    this.items = this.generateItemList(this.fragment.querySelectorAll('.slideable'));
    this.handleAdvance = this.handleAdvance.bind(this);
    this.animating = false;

    this.bindEvents([{
      event: ['click', 'touchstart'],
      target: 'controls',
      handlers: [this.handleAdvance],
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
    const list = new List();

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

    // throttling is tricky to get right, and I'd need a queue to handle
    // scheduling animations, and that means moving a lot of things that css
    // handles now into JS code. it would be less brittle than this
    // function is, but having an animating flag is a simple solution that
    // works fine from a user's vantage point
    if (this.animating) {
      return;
    }

    const { props } = this;
    const activeItem = this.currentItem();
    const currentItem = this.nextItem();
    const nextItem = this.nextItem();

    this.animating = true;

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
    nextItem.classList.add('current-item');
    nextItem.classList.remove('inactive');

    props.onAdvance(nextItem.getAttribute('data-index'));

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
 * click functionality -- todo? does it matter that users cant click on a project?
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

export default Carousel;
