import pureComponent from './pure-component';

export default function(props) {
  return pureComponent(props, ({ src, classes }) => {
    const classAttr = classes ? `class="${classes}"` : '';
    
    return `<img ${classAttr} src="images/${src}" />`;
  });
}