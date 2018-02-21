const carouselTemplate = (images) => {
  return (
    `<div class="carousel-container">
        <ul class="carousel-track fixed">
          ${images.join('')}
        </ul>
      </div>
      <svg role="button" class="arrow-icon carousel-control" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 476.213 476.213" style="enable-background:new 0 0 476.213 476.213;" xml:space="preserve" preserveAspectRatio="xMidYMin">
        <polygon points="405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 
          405.606,308.713 476.213,238.106 "/>
      </svg> 
    </div>
  `);
};

export default carouselTemplate;
