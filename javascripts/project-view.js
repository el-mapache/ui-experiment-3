import SimpleView from 'simple-view';
let count = 0;
const projectTemplate = ({ src, description, name, blurb, tech }) => {
  return (
    ` 
      <div class="project-view-content lipstick">
        <div class="project-info">
          <p>${description}</p>
        </div>
        <div class="project-metadata">
          <h1 class="callout-title">${name}</h1>
          <h3>${tech}</h3>
          <h4>${blurb}</h4>
        </div>
      </div>
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

        this.fragment.firstElementChild.classList.add('scale-in-back', 'project-view-backing')
        this.el.appendChild(this.fragment);
  
        oldChild.classList.add('project-view-backing', 'scale-out');
  
        if (count % 2) {
          this.el.children[1].classList.add('wine');
        } else if (count % 3) {
          this.el.children[1].classList.add('purple');
        } else {
          this.el.children[1].classList.add('blue');
        }
  
        setTimeout(() => {
          this.el.removeChild(oldChild);
          this.el.firstElementChild.classList.remove('project-view-backing', 'scale-in-back');
          count+=1;
        }, 700);
      }, 0);  

    }
  }
}

export default ProjectView;
