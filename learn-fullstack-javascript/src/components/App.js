import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => window.history.pushState(obj, '', url);
const onPopState = (handler) => (window.onpopstate = handler);

class App extends Component {
	state = this.props.initialData

	componentDidMount () {
	  onPopState((event) => {
	    this.setState({
	      currentContestId : (event.state || {}).currentContestId
	    });
	  });
	}

	componentWillUnmount () {
	  onPopState(null);
	}

	fetchContest = async (contestId) => {
	  pushState({ currentContestId: contestId }, `/contest/${contestId}`);

	  const contest = await api.fetchContest(contestId);

	  this.setState({
	    currentContestId : contest._id,
	    contests         : {
	      ...this.state.contests,
	      [contest._id]: contest
	    }
	  });
	}

	fetchContestList = () => {
	  pushState({ currentContestId: null }, '/');

	  api.fetchContestList().then((contests) => {
	    this.setState({
	      currentContestId : null,
	      contests
	    });
	  });
	}

	fetchNames = async (nameIds) => {
	  if (nameIds.length === 0) return;
	  const names = await api.fetchNames(nameIds);
	  this.setState({ names });
	}

	pageHeader () {
	  if (this.state.currentContestId) {
	    return this.currentContest().contestName;
	  }
	  return 'Naming Contest';
	}

	lookupName = (nameId) => {
	  if (!this.state.names || !this.state.names[nameId]) {
	    return 'loading ...';
	  }
	  return this.state.names[nameId].name;
	}

	addName = async (newName, contestId) => {
	  const res = await api.addName(newName, contestId);
	  this.setState({
	    contests : {
	      ...this.state.contests,
	      [res.updatedContest._id]: res.updatedContest
	    },
	    names    : {
	      ...this.state.names,
	      [res.newName._id]: res.newName
	    }
	  });
	}
	currentContest () {
	  const { contests, currentContestId } = this.state;
	  return contests[currentContestId];
	}

	currentContent () {
	  const { contests, currentContestId } = this.state;
	  if (currentContestId) {
	    return (
	      <Contest
	        contestListClick={this.fetchContestList}
	        {...this.currentContest()}
	        fetchNames={this.fetchNames}
	        lookupName={this.lookupName}
	        addName={this.addName}
	      />
	    );
	  }
	  return <ContestList onContestClick={this.fetchContest} contests={contests} />;
	}

	render () {
	  return (
	    <div className="App">
	      <Header message={this.pageHeader()} />
	      {this.currentContent()}
	    </div>
	  );
	}
}

App.propTypes = {
  initialData : PropTypes.object.isRequired
};

export default App;
