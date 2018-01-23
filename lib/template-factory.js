'use strict'

const getTemplate = (templateName) => {
    if (templateName === 'component'){
        return templateString;
    }
}

const templateString = 
`import React, { Component } from 'react';

class ComponentName extends Component {
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
            <div className="ComponentName">
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

export default ComponentName;`

module.exports = getTemplate;