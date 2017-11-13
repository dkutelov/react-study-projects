import React from 'react';

import Header from './header';
import Action from './action';
import Options from './options';
import AddOption from './addoption';
import OptionModal from './optionmodal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [
            'JS Understanding the Weird Parts',
            'The complete React web developer course',
            'Modern React with Redux', 
            'The Web Developer Bootcamp',
            'Foundation 6',
            'ES 6 Stephen Grider',
            'Projects in ExpressJS - Learn ExpressJs building 10 projects'],
        selectedOption: ''
    };

    handlePick = () => {
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        this.setState(() => ({selectedOption:option}));
    }

    addOption = (newOption) => {
        if (!newOption) {
            return 'Please, enter valid option!';
        } else if (this.state.options.indexOf(newOption) > -1 ) {
            return 'This option already exists!'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat([newOption]),
            selectedOption: ''
        }));
    }

    deleteOption = (option) => {
        const updetedOptions = this.state.options.filter( item => item!==option);
        this.setState((preState) => ({options: updetedOptions}));
    }

    deleteOptions = () => {
        this.setState(() => ({options: []}));
    }

    clearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options){
                this.setState(() => ({options}));
            }
        } catch(e) {
            // do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options));
        }
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
           <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            deleteOption={this.deleteOption}
                            deleteOptions={this.deleteOptions} 
                            options={this.state.options}/>
                        <AddOption 
                            addOption={this.addOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    clearSelectedOption={this.clearSelectedOption}
                />
            </div>
       )
    }
}

IndecisionApp.defaultProps = {
    options: []
}