import SimpleView from 'simple-view';
import projectTemplate from 'templates/project-template';

class ProjectView extends SimpleView {
  constructor({ el, project, onNextProject, animator }) {
    super({ el });

    this.animator = animator;
    this.animating = false;
    this.project = project;
    this.fragment = this.generateDOM(projectTemplate(project));

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
    this.fragment = this.generateDOM(projectTemplate(nextProject));

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

export default ProjectView;
