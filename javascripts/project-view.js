import SimpleView from 'simple-view';
let count = 0;
const projectTemplate = ({ src, description, name, blurb, tech }) => {
  return (
    ` 
      <article class="project-view-content lipstick">
        <div class="project-info">
          <p>${description}</p>
        </div>
        <div class="project-metadata">
          <h1 class="callout-title">${name}</h1>
          <h3>${tech}</h3>
          <h4>${blurb}</h4>
        </div>
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
        const oldChild = this.el.firstElementChild;

        this.fragment.firstElementChild.classList.add('scale-in', 'backing-project-view')
        this.el.appendChild(this.fragment);
  
        oldChild.classList.add('backing-project-view', 'scale-out');
  
        if (count % 2) {
          this.el.children[1].classList.add('wine');
        } else if (count % 3) {
          this.el.children[1].classList.add('blue');
        } else {
          this.el.children[1].classList.add('purple');
        }
  
        setTimeout(() => {
          this.el.removeChild(oldChild);
          this.el.firstElementChild.classList.remove('backing-project-view', 'scale-in');
          count+=1;
        }, 700);
      }, 200);  

    }
  }
}

export default ProjectView;
