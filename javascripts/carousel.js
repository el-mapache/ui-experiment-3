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
        viewBox="0 0 476.213 476.213" style="enable-background:new 0 0 476.213 476.213;" xml:space="preserve">
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
      event: 'click',
      target: 'carousel-control',
      handlers: [this.handleAdvance],
    }]);
  }

  compileTemplate(sources) {
    const imageList = sources.map((src, index) => {
      let classes = '';

      if (!index) {
        classes = 'current-item';
      } else if (index === sources.length - 1) {
        classes = 'active';
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

  delegateEvent(selector, fn) {
    return (event) => {
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
    activeItem.classList.remove('active');
    currentItem.classList.add('scale-and-fade', 'active');
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
      currentItem.classList.remove('current-item');
      nextItem.classList.remove('scale-and-fade');
      this.animating = false;
    }, 700); // magic number is amount of milliseconds of the scale-and-fade animation
  }
}

export default Carousel;
