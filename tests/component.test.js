const componentTemplate = require('../templates/component');

describe('component', () => {
  it('includes the correct name variable', () => {
    const name = 'ComplicatedButton';
    const includedMethods = {
      componentWillMount: true,
      componentWillReceiveProps: true,
      shouldComponentUpdate: true,
      componentWillUpdate: true,
      componentDidMount: true,
      componentDidUpdate: true,
      componentWillUnmount: true,
      componentDidCatch: true
    };
    const compReturnVal = componentTemplate(name, includedMethods);
    const expectedTemplate =
`import React, { Component } from 'react';

class ${name} extends Component {
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

export default ${name};`;

    expect(compReturnVal).toBe(expectedTemplate);
  });

  it('includes the correct lifecycle methods', () => {
    const name = 'ComplicatedButton';
    const includedMethods = {
      componentWillMount: true,
      componentWillReceiveProps: true,
      shouldComponentUpdate: false,
      componentWillUpdate: true,
      componentDidMount: true,
      componentDidUpdate: false,
      componentWillUnmount: true,
      componentDidCatch: false
    };
    const compReturnVal = componentTemplate(name, includedMethods);
    const expectedTemplate =
`import React, { Component } from 'react';

class ${name} extends Component {
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

    componentWillUnmount() {
    }
}

export default ${name};`;

    expect(compReturnVal).toBe(expectedTemplate)
  })
});