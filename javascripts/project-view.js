import SimpleView from 'simple-view';
import projectTemplate from 'templates/project-template';

class ProjectView extends SimpleView {
  constructor({ el, project, onNextProject }) {
    super({ el });

    this.animating = false;
    this.project = project;
    this.fragment = this.generateDOM(projectTemplate(project));

    this.el.addEventListener('click', (event) => {
      if (event.target.classList.contains('project-cycle')) {
        onNextProject();
      }
    });

    this.el.addEventListener('touchstart', (event) => {
      if (event.target.classList.contains('project-cycle')) {
        onNextProject();
      }
    });
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
      if (this.animating) {
        return;
      }

      this.animating = true;

      setTimeout(() => {
        let oldChild = this.el.firstElementChild;

        this.fragment.firstElementChild.classList.add('scale-in', 'backing-project-view');
        this.el.appendChild(this.fragment);
  
        oldChild.classList.add('backing-project-view', 'scale-out');

        window.scrollTo(0, 0);

        setTimeout(() => {
          this.el.removeChild(oldChild);
          this.el.firstElementChild.classList.remove('backing-project-view', 'scale-in');

          oldChild = null;
          this.animating = false;
        }, 700);
      }, 0);  
    }
  }
}

export default ProjectView;

/**
 * TODO:
 * There is a bug with orchestrating the animations of the carousel and the project views
 * Since I want a delay between the carousel animation and the beginning of the project 
 * transition, a race condition can be caused when attempting to move to the next carousel
 * item before the end of the project view animations.
 * 
 * This occurs because the carousel view locks ins behavior for 700 milliseconds while animating,
 * and the project view locks its behaviour for 900 milliseconds. Until I have an object to manage these
 * transitions, I'm removing the initial delay in the project view's animation cycle
 */