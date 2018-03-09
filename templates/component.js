'use strict';

const componentTemplate = (name, includedMethods) => {
    let template =

`import React, { Component } from 'react';

class ${name} extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    static defaultProps = {
    }
`;

if (includedMethods.componentWillMount)
    template +=
`
    componentWillMount() {
    }
`;

if (includedMethods.componentWillReceiveProps)
    template +=
`
    componentWillReceiveProps(nextProps){
    }
`;

if (includedMethods.shouldComponentUpdate)
    template +=
`
    shouldComponentUpdate(nextProps, nextState){
    }
`;

if (includedMethods.componentWillUpdate)
    template +=
`
    componentWillUpdate(nextProps, nextState){
    }
`;

template +=
`
    render() {
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        );
    }
`;

if (includedMethods.componentDidMount)
    template +=
`
    componentDidMount() {
    }
`;

if (includedMethods.componentDidUpdate)
    template +=
`
    componentDidUpdate(prevProps, prevState){
    }
`;

if (includedMethods.componentWillUnmount)
    template +=
`
    componentWillUnmount() {
    }
`;

if (includedMethods.componentDidCatch)
    template +=
`
    componentDidCatch(error, info){
    }
`;

template +=
`}

export default ${name};`;

    return template;
}

module.exports = componentTemplate;