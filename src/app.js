import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import IndecisionApp from './components/indecisionapp';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));



class OldSyntax {
    constructor() {
        this.name = 'Dari';
    }
    getGreeting() {
        return `Hi, My name is ${this.name}.`
    }
}

const oldSyntax = new OldSyntax();
console.log(oldSyntax.getGreeting());

class NewSyntax {
    name = 'Andi';
    getGreeting = () => {
        return `Hi, My name is ${this.name}.`
    }
}

const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting;
console.log(newGetGreeting());