
class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors:['#00cccc','#fe4a49','#6457a6'],
            currentColor: '#dadff7'
        };
        this.changeColor();
    }

    changeColor() {  
        setTimeout(() => {
            document.querySelector('.slide').style.backgroundColor = this.state.currentColor;
            this.setState(()=>{
                return {currentColor:this.state.colors[0]}
            });
            console.log(this.state.currentColor);
        }, 2000);
    }

    render(){
        return (
            <div className="slide">
            </div>
        )
    }
}

class Slider extends React.Component {


    render() {
        return (
            <div className="slider">
                <Slide />
            </div>
        )
    }
}

const appRoot = document.getElementById('app');
ReactDOM.render(<Slider />,appRoot);







// class Person {
//     constructor(name = 'Anonymous', age = 0) {
//         this.name = name;
//         this.age = age;
//     }

//     getGreeting(){
//         return `Hi, I am ${this.name}!`;
//     }

//     getDescription(){
//         return `${this.name} is ${this.age} year(s) old.`;
//     }

// }

// class Taveler extends Person {
//     constructor(name, age, location) {
//         super(name, age);
//         this.location = location;
//     }

//     getGreeting(){
//         let message = super.getGreeting();
//         if (this.location) {
//             message += ` I am visiting from ${this.location}.`;
//         }
//         return message;
//     }
// }

// const me = new Taveler("Dari",48, 'Sofia');
// console.log(me.getGreeting());

// const sndMe = new Taveler();
// console.log(sndMe.getGreeting());