// JSX - JavaScript XML

const app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: []
}

const onFormSubmit = (e) => {
    e.preventDefault();
   
    const option = e.target.elements.indecisionAppOption.value;

    if (option) {
        app.options.push(option);
        e.target.elements.indecisionAppOption.value = '';
    }
    console.log(app.options);
    renderIndecisionApp();
}

const clearOptions = () => {
    app.options = [];
    renderIndecisionApp();
}

const getOptions = () => {
    if (app.options.length) {
        return app.options.map((option,i) => <li key={i}>{option}</li>);
    }
}

const makeDecision = () => {
   const randNum = Math.floor(Math.random() * app.options.length);
   const option = app.options[randNum];
   console.log(option);
}

let toggleIndex;
const toggleP = () => {
    toggleIndex = !toggleIndex;
    renderIndecisionApp();
    console.log('toggle');
}

const appRoot = document.getElementById('app');

const renderIndecisionApp = () => {
const template = (
    <div>
        <h1>{app.title.toUpperCase()}</h1>
        {app.subtitle && <h3>{app.subtitle}</h3>}
        <p>{app.options.length > 0 ? "Here are your options" : "No options!"}</p>
        <button disabled={!app.options.length} onClick={makeDecision}>What should I do?</button>
        <button onClick={clearOptions}>Remove All</button>
        <ol>
            {getOptions()}
        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="indecisionAppOption"/>
            <button>Add option</button>
        </form>
       <button onClick={toggleP}>
            {toggleIndex ? 'Hide details' : 'Show details'}
        </button>
       {toggleIndex && (
        <div>
            <p>Hey! These are some details you can now see.</p>
        </div>   
        )}
    </div>
);

ReactDOM.render(template,appRoot);
}

renderIndecisionApp();