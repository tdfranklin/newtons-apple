const dumbComponentTemplate = require('../templates/dumb-component');

describe('dumbComponentTemplate', () => {
  it('includes the correct name variable', () => {
    const name = 'UglyButton';
    const dumbReturnVal = dumbComponentTemplate(name);
    const expectedTemplate =
`import React from 'react';

const ${name} = (props) => {
  return (
    <div>
      <h3>Hello World</h3>
    </div>
  );
};

export default ${name};`;

    expect(dumbReturnVal).toBe(expectedTemplate)
  });
});