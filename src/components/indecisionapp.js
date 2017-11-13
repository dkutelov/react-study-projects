
import React from 'react';
import Header from './header';
import Action from './action';
import Options from './options';
import AddOption from './addoption';
import OptionModal from './optionmodal';
import SelectLanguage from './selectlanguage';

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
        selectedOption: '',
        isEnglish: true
    };
    
    handlePick = () => {
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        this.setState(() => ({selectedOption:option}));
    }
    
    selectLanguage = (language) => {
        if (language === 'english') {
            this.setState(() => ({ isEnglish: true }));
        } else {
            this.setState(() => ({ isEnglish: false }));
        }
    }

    addOption = (newOption) => {
        const isOptionValid = this.state.isEnglish ? 'Please, enter valid option!' : 'Моля, въведи валидна опция!';
        const doesOptionExists = this.state.isEnglish ? 'This option already exists!' : 'Тази опция вече съществува!';
       
        if (!newOption) {
            return isOptionValid;
        } else if (this.state.options.indexOf(newOption) > -1 ) {
            return doesOptionExists;
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
            const isEnglishString = localStorage.getItem('isEnglish');
            const isEnglish = JSON.parse(isEnglishString);
            if (options){
                this.setState(() => ({options}));
            }
            console.log(isEnglishString);
            if ( isEnglishString !== null) {
                this.setState(() => ({isEnglish}));
            }

        } catch(e) {
            // do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options));
        }
        localStorage.setItem('isEnglish', JSON.stringify(this.state.isEnglish));
    }

    render() {
        const title = this.state.isEnglish ? 'Can\'t decide what to do?' : 'Не можеш да решиш?';
        const subtitle = this.state.isEnglish ? 'Put your life in the hands of a computer!' : 'Остави избора в "ръцете" на компютъра!';

        return (
           <div>
                <SelectLanguage 
                    isEnglish={this.state.isEnglish}
                    selectLanguage={this.selectLanguage}
                />
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                        isEnglish={this.state.isEnglish}
                    />
                    <div className="widget">
                        <Options
                            deleteOption={this.deleteOption}
                            deleteOptions={this.deleteOptions} 
                            options={this.state.options}
                            isEnglish={this.state.isEnglish}
                        />
                        <AddOption 
                            addOption={this.addOption}
                            isEnglish={this.state.isEnglish}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    clearSelectedOption={this.clearSelectedOption}
                    isEnglish={this.state.isEnglish}
                />
            </div>
       )
    }
}

// IndecisionApp.defaultProps = {
//     options: [],
//     isEnglish: true
// }