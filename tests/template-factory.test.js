const getComponentTemplate = require('../lib/template-factory');

describe('getComponentTemplate', () => {
  let includedMethods;

  beforeAll(() => {
    includedMethods = {
      componentWillMount: true,
      componentWillReceiveProps: true,
      shouldComponentUpdate: true,
      componentWillUpdate: true,
      componentDidMount: true,
      componentDidUpdate: true,
      componentWillUnmount: true,
      componentDidCatch: true
    };
  });

  it('calls the dumbComponentTemplate correctly', () => {
    const componentName = 'UglyButton';
    const isDumb = true;
    const returnedTemplate = getComponentTemplate(componentName, isDumb, includedMethods);
    const expectedTemplate =
`import React from 'react';

const ${componentName} = (props) => {
  return (
    <div>
      <h3>Hello World</h3>
    </div>
  );
};

export default ${componentName};`;

    expect(returnedTemplate).toBe(expectedTemplate);
  });

  it('calls the componentTemplate correctly', () => {
    const componentName = 'ComplicatedButton';
    const isDumb = false;
    const returnedTemplate = getComponentTemplate(componentName, isDumb, includedMethods);
    const expectedTemplate =
`import React, { Component } from 'react';

class ${componentName} extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    static defaultProps = {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    shouldComponentUpdate(nextProps, nextState){
    }

    componentWillUpdate(nextProps, nextState){
    }

    render() {
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        );
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState){
    }

    componentWillUnmount() {
    }

    componentDidCatch(error, info){
    }
}

export default ${componentName};`;

    expect(returnedTemplate).toBe(expectedTemplate);
  });
});