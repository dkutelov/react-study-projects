import React from 'react'
import _ from 'lodash'

const Stars = (props) => {
    // Lodash _.range(number) -> [0,1, ..., number-1]
    return (
      <div className="col-5">
        {_.range(props.numberOfStars).map( i =>
          <i key={i} className="fa fa-star"></i>
        )}
      </div>
    )
  }

  export default Stars