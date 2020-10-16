import React from 'react'
import _ from 'lodash'

const Numbers = (props) => {
    // Checks if the number is in the selectedNumbers array and if so it adds class selected.
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number)>= 0) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(number)>= 0) {
            return 'selected';
        }
    }
  
    return (
      <div className="card text-center">
        <div>
          {Numbers.list.map( number => 
            <span 
              key={number} 
              className={numberClassName(number)}
              onClick={() => props.selectNumber(number)}>
                {number}
              </span>
          )}
        </div>
      </div>
    )
  }
  
  // Variable is attached to the object to avoid declaration in every instance
  Numbers.list = _.range(1,10);

  export default Numbers