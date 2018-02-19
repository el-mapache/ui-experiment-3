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
          <button type="button" role="nav" class="project-cycle btn">
            Next Project
          </button>
        </div>
        <figure class="hero-image">
          <img src="images/${src}" />
        </figure>
      </article>
    `
  );
};

class ProjectView extends SimpleView {
  constructor({ el, project, onNextProject }) {
    super({ el });

    this.animating = false;
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

    this.el.addEventListener('click', (event) => {
      if (event.target === this.el.querySelector('.project-cycle')) {
        onNextProject();
      }
    });

    this.el.addEventListener('touchstart', (event) => {
      if (event.target === this.el.querySelector('.project-cycle')) {
        onNextProject();
      }
    });
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
      if (this.animating) {
        return;
      }

      this.animating = true;      
    
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
        
        window.scrollTo(0, 0);
        
        setTimeout(() => {
          this.el.removeChild(oldChild);
          this.el.firstElementChild.classList.remove('backing-project-view', 'scale-in');
          
          oldChild = null;
          count+=1;
          this.animating = false;

        }, 700);
      }, 200);  

    }
  }
}

export default ProjectView;
