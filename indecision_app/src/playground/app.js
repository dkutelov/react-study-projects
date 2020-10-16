class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: props.options,
            selectedOption: ''
        };
        this.deleteOptions = this.deleteOptions.bind(this);
        this.addOption = this.addOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
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

    handlePick() {
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        this.setState(() => ({selectedOption:option}));
    }

    addOption(newOption){
        if (!newOption) {
            return 'Please, enter valid option';
        } else if (this.state.options.indexOf(newOption) > -1 ) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat([newOption]),
            selectedOption: ''
        }));
    }

    deleteOption(option){
        const updetedOptions = this.state.options.filter( item => item!==option);
        this.setState((preState) => ({options: updetedOptions}));
    }

    deleteOptions(){
        this.setState(() => ({options: []}));
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
           <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    selectedOption = {this.state.selectedOption}
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    deleteOption={this.deleteOption}
                    deleteOptions={this.deleteOptions} 
                    options={this.state.options}/>
                <AddOption 
                    addOption={this.addOption}
                />
            </div>
       )
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

const Action = (props) => {
    return (
        <div>
            <button
                disabled={!props.hasOptions}
                onClick={props.handlePick}
            >
                What should I do?
            </button>
            {props.selectedOption && <p>{props.selectedOption}</p>}
        </div>
    )
}

const Options = (props) => {
    const numOptions = props.options.length;
    const options =  props.options;

    return (
        <div>
           {numOptions === 0 &&  <p>Please, add an option to get started.</p>}
            <label>Your Options</label>
            <button onClick={props.deleteOptions}>Remove all</button>
            <ol>
                {
                    options.map((option,i) => <Option key={i} 
                                                optionText={option}
                                                deleteOption={props.deleteOption} />)
                }
            </ol>
        </div>
    );
}

const Option = (props) => {

    return (
        <li>
        {props.optionText}
        <button onClick={ (e) => {
            props.deleteOption(props.optionText);
        }}>
            Remove
        </button>
        </li>
    );
}


class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e) {
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
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="newOption"/>
                    <div>
                        <button>Add option</button>
                    </div>
                </form>
            </div>
        )
    }
}


IndecisionApp.defaultProps = {
    options: []
}

ReactDOM.render(<IndecisionApp options={['React','Angular','Vue', 'Express', 'Foundation']} />, document.getElementById('app'));