import pureComponent from './pure-component';

export default function(props) {
  return pureComponent(props, ({ classes, children }) => {
    const finalClasses = `slideable${classes}`;
 
    return (
      `
        <li class="${finalClasses}">
          ${children}
        </li>
      `
    );
  });
};
