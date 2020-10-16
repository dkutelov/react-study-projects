import React from 'react';

class AddOption extends React.Component {
    state = {
        error: undefined
    }

    handleAddOption = (e) => {
        e.preventDefault();    
        const option = e.target.elements.newOption.value.trim();
        const error = this.props.addOption(option);
        this.setState(() => ({error}));

        if (!error){
            e.target.elements.newOption.value = '';
        }
     }

    render(){
        return (
            <div>
                {this.state.error && <p className="add-option__error">{this.state.error}</p>}
                <form className="add-option__form" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="newOption"/>
                    <div>
                        <button
                            className="button button--wide button--medium button--purple">
                            { this.props.isEnglish ? 'Add option' : 'Добави опция' }
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddOption;