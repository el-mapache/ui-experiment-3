class SimpleView {
  constructor({ el }) {
    this.el = el;
  }

  delegateEvent(selector, fn) {
    return (event) => {
      const { target } = event;
      let parent = target.parentElement;

      while (parent !== this.el && parent !== null) {
        parent = parent.parentElement;
      }

      if (!parent) {
        return;
      }

      fn.call(this, event);
    };
  }

  bindEvents(descriptors) {
    descriptors.forEach(eventObject => {
      const { event, target, handlers } = eventObject;
      const events = Array.isArray(event) ? event : [ event ];
      
      handlers.forEach((fn) => {
        const delegatedFn = this.delegateEvent(target, fn);
        
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

export default SimpleView;
