import React from 'react'

const Answer = (props) => {
    // onClick should be wirh callback !!!
    return (
      <div className="col-5">
        {props.selectedNumbers.map( (num, i) => 
          <span 
            key={i}
            onClick={() => props.unselectNumber(num)}>
            {num}
          </span>
        )}
      </div>
    )
  }
  

export default Answer