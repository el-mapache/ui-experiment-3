import SimpleView from 'simple-view';
let count = 0;
const projectTemplate = ({ src, description, name, blurb, tech }) => {
  return (
    ` 
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
    `
  );
};

class ProjectView extends SimpleView {
  constructor({ el, project }) {
    super({ el });

    this.project = project;
    this.fragment = this.generateDOM(
      projectTemplate({
        src: this.project.file,
        description: this.project.description,
        name: this.project.name,
        tech: this.project.tech,
        blurb: this.project.blurb,
      })
    );
  }

  willUpdate({ src, description, blurb, tech, name }) {
    this.previousFragment = this.fragment;
    this.fragment = this.generateDOM(
      projectTemplate({
        src,
        description,
        blurb,
        tech,
        name,
      })
    );

    this.render();
  }

  render() {
    if (!this.previousFragment) {
      this.el.innerHTML = '';
      this.el.appendChild(this.fragment);
    } else {
      setTimeout(() => {
        let oldChild = this.el.firstElementChild;

        this.fragment.firstElementChild.classList.add('scale-in', 'backing-project-view')
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
          
          this.el.scrollTop = 0;
          
          oldChild = null;
          count+=1;
        }, 700);
      }, 200);  

    }
  }
}

export default ProjectView;
