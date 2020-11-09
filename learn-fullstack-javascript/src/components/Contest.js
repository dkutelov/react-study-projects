import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
	textInput = React.createRef()

	componentDidMount () {
	  this.props.fetchNames(this.props.nameIds);
	}

	handleSubmit = (event) => {
	  event.preventDefault();
	  const newName = this.textInput.current.value;
	  this.props.addName(newName, this.props._id);
	  this.textInput.current.value = '';
	}

	render () {
	  return (
	    <div className="Contest">
	      <div className="panel panel-default">
	        <div className="panel-heading">
	          <h3 className="panel-title">Contest Description</h3>
	        </div>
	        <div className="panel-body">
	          <div className="contest-description">{this.props.description}</div>
	        </div>
	      </div>

	      <div className="panel panel-default">
	        <div className="panel-heading">
	          <h3 className="panel-title">Proposed Names</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
	            {this.props.nameIds.map((nameId) => (
	              <li key={nameId} className="list-group-item">
	                {this.props.lookupName(nameId)}
	              </li>
	            ))}
	          </ul>
	        </div>
	      </div>

	      <div className="panel panel-info">
	        <div className="panel-heading">
	          <h3 className="panel-title">Propose a New Name</h3>
	        </div>
	        <div className="panel-body">
	          <form onSubmit={this.handleSubmit}>
	            <div className="input-group">
	              <input
	                ref={this.textInput}
	                type="text"
	                placeholder="New Name Here..."
	                className="form-control"
	              />
	              <span className="input-group-btn">
	                <button type="submit" className="btn btn-info">
										Sumbit
	                </button>
	              </span>
	            </div>
	          </form>
	        </div>
	      </div>

	      <div className="home-link link" onClick={this.props.contestListClick}>
					Contest link
	      </div>
	    </div>
	  );
	}
}

Contest.propTypes = {
  _id              : PropTypes.string.isRequired,
  description      : PropTypes.string.isRequired,
  contestListClick : PropTypes.func.isRequired,
  fetchNames       : PropTypes.func.isRequired,
  lookupName       : PropTypes.func.isRequired,
  nameIds          : PropTypes.array.isRequired,
  addName          : PropTypes.func.isRequired
};

export default Contest;
