const projectTemplate = ({ src, description, name, blurb, tech, uri, repo, available, color }) => {
  return (
    `
      <article class="project-view-content ${color}">
        <div class="project-title">
          <button type="button" role="nav" class="project-cycle btn right">
            Next Project
          </button>
          <h1 class="name">${name}</h1>
          <h4 class="tech">${tech}</h4>
          <div class="project-links">
            <a class="link" href="${repo}" target="_blank" rel="nofollow">code</a>
            ${ available ? `<a class="link" href="${uri}" target="_blank" rel="nofollow">demo</a>` : '' }
          </div>
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

export default projectTemplate;