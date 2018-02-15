const pureComponent = (props = {}, template) => {
  const templateString = template(props);

  return {
    props,
    dom: createDOM(templateString),
  };
};

const createDOM = templateString => {
  const range = document.createRange();

  return range.createContextualFragment(templateString);
};

export default pureComponent;
