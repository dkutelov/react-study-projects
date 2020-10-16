import React, {Component} from 'react'
import _ from 'lodash'

import Stars from './stars'
import Numbers from './numbers'
import Button from './button'
import Answer from './answer'
import DoneFrame from './doneframe'
import HowToPlay from './howtoplay'

// Checks if there are possible solutions with non used numbers
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

// Declare counter variable for timeCouner function
let counter = null;

class Game extends Component {
    static randomNumber = () => 1 + Math.floor(Math.random()*9);
    static timeCounter = (start) => {
      if (start) {
        counter = setInterval(() => {
          Game.timer += 1;
          console.log(Game.timer);
        }, 1000)
      } else {
        clearInterval(counter)
      }
    }

    static initialState = () => ({
      selectedNumbers: [],
      usedNumbers: [],
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      redraws:5,
      doneStatus: null
    })

    state = Game.initialState()

    //Checks every second if time is up
    checkTime = () => {
      setInterval(() => {
        if (Game.timer > 60) {
          this.setState( prevState => {
            if (!prevState.doneStatus) {
              return ({doneStatus: 'Game Over!'});
            }
          })
        }  
      },1000)
    }

    // Reseting the game
    resetGame = () => {
      this.setState(Game.initialState());
      Game.timeCounter(false)
      Game.timer = 0;
      Game.timeCounter(true);
    }

    // if number in Numbers clicked the function adds it to the state selectedNumbers
    selectNumber = (clickedNumber) => {
      if (this.state.selectedNumbers.indexOf(clickedNumber)>=0) { return;}
      this.setState( prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }))
    }
  
    // if number in Answers click the function excludes it from the state array selectedNumbers
    unselectNumber = (clickedNumber) => {
      this.setState( prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
      }))
    }
    
    // Checks if sum of selected numbers is equal to number of stars and modifies appearance of the button accordingly
    checkAnswer = () => {
      this.setState( prevState => ({
        answerIsCorrect: prevState.numberOfStars ===
          prevState.selectedNumbers.reduce((acc,n) => acc+n,0)
      }))
    }

    // included in the state since it needs to re-render the component on change
    acceptAnswer = () => {
      this.setState( prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers:[],
        answerIsCorrect: null,
        numberOfStars: Game.randomNumber()
      }), this.updateDoneStatus)
    }
      //
    redraw = () => {
      this.setState( prevState => ({
        selectedNumbers:[],
        answerIsCorrect: null,
        numberOfStars: Game.randomNumber(),
        redraws: prevState.redraws - 1
      }), this.updateDoneStatus)
    }
    
    // Creates an array of not used numbers and check if possible solutions exist
    possibleSolutions = ({numberOfStars, usedNumbers}) => {
      const possibleNumbers = _.range(1,10).filter(number =>
        usedNumbers.indexOf(number) === -1
      )
      
      return possibleCombinationSum(possibleNumbers, numberOfStars)
    }
    
    updateDoneStatus = () => {
      this.setState( prevState => {
        if ( prevState.usedNumbers.length === 9 ) {
          return {doneStatus: 'Done. Nice!'}
        }
        if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
          return {doneStatus: 'Game Over!'}
        }
      })
    }
    
    render(){
      this.checkTime();
      // destructuring the stare
      const {
        selectedNumbers, 
        numberOfStars, 
        answerIsCorrect, 
        usedNumbers,
        redraws,
        doneStatus
      } = this.state;
      
      return (
        <div className="container">
          <h3>Play Nine</h3>
          <hr />
          <div className="row">
            <Stars numberOfStars={numberOfStars}/>
            <Button 
              answerIsCorrect={answerIsCorrect}
              checkAnswer={this.checkAnswer}
              selectedNumbers={selectedNumbers}
              acceptAnswer={this.acceptAnswer}
              redraw={this.redraw}
              redraws={redraws}/>
            <Answer 
              selectedNumbers={selectedNumbers}
              unselectNumber={this.unselectNumber}/>
          </div>
          <br />
          {doneStatus ? 
            <DoneFrame 
              doneStatus={doneStatus}
              resetGame={this.resetGame}/> :
          <Numbers 
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}/>
          }
          <HowToPlay />
        </div>
      )
    }
  }
  
  Game.timer = 0  
  Game.timeCounter(true)

  export default Game;
