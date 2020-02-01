import React, { Component } from 'react';
import config from './config.json';

class Greeter extends Component {
    render() { 
        return ( 
        <h1>{config.greetText}</h1>
         );
    }
}
 
export default Greeter;


// const config = require('./config.json')
// module.exports = () => {
//     let greet = document.createElement("div");
//     greet.innerText = config.greetText;
//     return greet;
// }