import { List } from 'linked-list';
import SimpleView from 'simple-view';
import carouselItem from 'templates/carousel-item';
import carouselTemplate from 'templates/carousel-template';

class Carousel extends SimpleView {
  constructor({ el, sources, props = {}, animator }) {
    super({ el });

    this.props = props;
    this.fragment = this.compileTemplate(sources);
    this.track = this.fragment.querySelector('.carousel-track')
    this.items = this.generateItemList(this.fragment.querySelectorAll('.slideable'));
    this.handleAdvance = this.handleAdvance.bind(this);
    this.animator = animator;

    this.bindEvents([{
      event: ['click', 'touchstart'],
      target: 'caorusel-control',
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

      return carouselItem({ src, classes, index });
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
    }, 1)

    this.animator.describeAnimation('hideLastItem', () => {
      currentItem.classList.remove('current-item', 'scale-out');
    }, 700);
  }
}

export default Carousel;
