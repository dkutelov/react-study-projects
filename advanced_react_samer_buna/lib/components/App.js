import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pickBy from 'lodash.pickby'

import ArticleList from './ArticleList'
import SearchBar from './SearchBar'

class App extends Component {
	// Need to specify type of context object
	static childContextTypes = {
	    store : PropTypes.object
	}
	// set store as contect object
	getChildContext () {
	    return {
	        store : this.props.store
	    }
	}
	state = this.props.store.getState()
	// update when the store state changes ... subscribe ...
	onStoreChange = () => {
	    this.setState(this.props.store.getState())
	}
	componentDidMount () {
	    this.subscriptionId = this.props.store.subscribe(this.onStoreChange)
	}
	componentWillUnmount () {
	    this.props.unsubscribe(this.subscriptionId)
	}

	render () {
	    let { articles, searchTerm } = this.state
	    if (searchTerm) {
	        articles = pickBy(articles, (value) => {
	            return value.title.match(searchTerm) || value.body.match(searchTerm)
	        })
	    }
	    return (
	        <React.Fragment>
	            <SearchBar doSearch={this.props.store.setSearchTerm} />
	            <ArticleList articles={articles} />
	        </React.Fragment>
	    )
	}
}

export default App
