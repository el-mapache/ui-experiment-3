import projects from 'project-data';
import ImagePreloader from 'image-preloader';
import ProjectView from 'project-view';
import Carousel from 'carousel';
import ImageView from 'image-view';
import CarouselItem from 'carousel-item';

const stateManager = {
  currentIndex: 0,
  currentProject: projects[0],
  onNextItem(index) {
    this.currentIndex = index;
    this.currentProject = projects[index];
    
    projectView.update(this.currentProject);
  },
  getNextProject() {
    const { currentIndex } = this;

    this.currentIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;

    const project = projects[this.currentIndex];

    projectView.update(project);
  }
};

const carouselEl = document.querySelector('.carousel');
const carousel = new Carousel({
  el: carouselEl,
  sources: projects.map(project => project.src),
  props: {
    onAdvance: stateManager.onNextItem,
    children: projects.map((project, index) => {
      const active = index === projects.length - 1 ? 'active' : '';
      return CarouselItem({
        classes: active,
        children: ImageView({ src: project.src}),
      });
    }),
  },
});
console.log(stateManager.currentProject)
const projectView = new ProjectView({
  el: document.querySelector('.project-view'),
  project: stateManager.currentProject,
  onNextProject: stateManager.getNextProject.bind(stateManager),
})

new ImagePreloader({
  imageSelector: 'img',
  containerNode: document,
  options: {},
}).then((preloadFn) => {
  carousel.render();
  projectView.render();
  preloadFn();
});
