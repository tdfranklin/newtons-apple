'use strict';

const componentTemplate = (name, willMount, willReceiveProps, shouldUpdate, willUpdate, didMount, didUpdate, willUnmount, didCatch) => {
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

    if (willMount)
        template +=
        `
        componentWillMount() {
        }
        `;

    if (willReceiveProps)
        template +=
        `
        componentWillReceiveProps(nextProps){
        }
        `;

    if (shouldUpdate)
        template +=
        `
        shouldComponentUpdate(nextProps, nextState){
        }
        `;

    if (willUpdate)
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

    if (didMount)
        template +=
        `
        componentDidMount() {
        }
        `;

    if (didUpdate)
        template +=
        `
        componentDidUpdate(prevProps, prevState){
        }
        `;

    if (willUnmount)
        template +=
        `
        componentWillUnmount() {
        }
        `;

    if (didCatch)
        template +=
        `
        componentDidCatch(error, info){
        }
        `;

    template +=
        `
    }

export default ${name};`;

    return template;
}

module.exports = componentTemplate;