class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count',this.state.count);
        }
    }

    componentDidMount() {
        try {
            const count = parseInt(localStorage.getItem('count'),10);            

            if (!isNaN(count)){
                this.setState(() => ({count}));
            }
        } catch(e) {
            // do nothing
        }
    }

    handleAddOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });
    }

    handleMinusOne() {
        this.setState((prevState) => {
            if (prevState.count) {
                return {
                    count: prevState.count - 1
                }
            }        
        });
        
    }

    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }       
        });
    }

    render() {
        return (
            <div>
                <h1>Count:{this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>

        )
    }
}

const appRoot = document.getElementById('app');
ReactDOM.render(<Counter />,appRoot);

// let count=0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
// }
// const minusOne = () => {
//     count>0 ? count-- : count=0;
//     renderCounterApp();
// }
// const resetCounter = () => {
//     count = 0;
//     renderCounterApp();
// }

// const appRoot = document.getElementById('app');

// const renderCounterApp = () => {

//     const templateCounter = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={addOne}>+1</button>
//             <button onClick={resetCounter}>Reset</button>
//         </div>
//     )

//     ReactDOM.render(templateCounter,appRoot);
// }
// // Initialize
// renderCounterApp();