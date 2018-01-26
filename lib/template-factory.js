'use strict';

const componentTemplate = require ('../templates/component');

const getTemplate = (componentName, includedMethods) => {
    let willMount = includedMethods.componentWillMount;
    let willReceiveProps = includedMethods.componentWillReceiveProps;
    let shouldUpdate = includedMethods.shouldComponentUpdate;
    let willUpdate = includedMethods.componentWillUpdate;
    let didMount = includedMethods.componentDidMount;
    let didUpdate = includedMethods.componentDidUpdate;
    let willUnmount = includedMethods.componentWillUnmount;
    let didCatch = includedMethods.componentDidCatch;

    return componentTemplate(componentName, willMount, willReceiveProps, shouldUpdate, 
        willUpdate, didMount, didUpdate, willUnmount, didCatch);
}

module.exports = getTemplate;


// const templateString = 
// `import React, { Component } from 'react';

// class ComponentName extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     };

//     static defaultProps = {
//     }

//     componentWillMount() {
//     }
    
//     componentWillReceiveProps(nextProps){
//     }

//     shouldComponentUpdate(nextProps, nextState){
//     }

//     componentWillUpdate(nextProps, nextState){
//     }

//     render() {
//         return (
//             <div className="ComponentName">
//                 <h3>Hello World</h3>
//             </div>
//         );
//     }

//     componentDidMount() {
//     }

//     componentDidUpdate(prevProps, prevState){
//     }

//     componentWillUnmount() {
//     }

//     componentDidCatch(error, info){
//     }
// }

// export default ComponentName;`