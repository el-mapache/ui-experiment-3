const carouselItem = ({ src, classes, index }) => {
  const finalClasses = `slideable ${classes}`;
 
  return (
    `
      <li data-index=${index} class="${finalClasses}">
        <img src="images/${src}" />
      </li>
    `
  );
};

export default carouselItem;
