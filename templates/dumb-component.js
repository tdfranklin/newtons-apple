'use strict';

const dumbComponentTemplate = (name) => {
  let template =

`import React from 'react';

const ${name} = (props) => {
  return (
    <div>
      <h3>Hello World</h3>
    </div>
  );
};

export default ${name};`;

  return template;
}

module.exports = dumbComponentTemplate;