import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends Component {
	handleClick = () => {
	  this.props.onContestClick(this.props._id);
	}
	render () {
	  const { categoryName, contestName } = this.props;
	  return (
	    <div className="link ContestPreview" onClick={this.handleClick}>
	      <div className="category-name">{categoryName}</div>
	      <div className="contest-name">{contestName}</div>
	    </div>
	  );
	}
}

ContestPreview.propTypes = {
  _id            : PropTypes.string.isRequired,
  categoryName   : PropTypes.string,
  contestName    : PropTypes.string,
  onContestClick : PropTypes.func.isRequired
};

export default ContestPreview;
