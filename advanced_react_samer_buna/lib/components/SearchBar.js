import React, { Component } from 'react'
import debounce from 'lodash.debounce'

export default class SearchBar extends Component {
	state = {
	    searchTerm : ''
	}

	doSearch = debounce(() => {
	    this.props.doSearch(this.state.searchTerm)
	}, 300)

	handleSearch = (e) => {
	    this.setState({ searchTerm: e.target.value }, () => {
	        this.doSearch()
	    })
	}

	render () {
	    return (
	        <input
	            type="search"
	            placeholder="Enter search term"
	            onChange={this.handleSearch}
	            value={this.state.searchTerm}
	        />
	    )
	}
}

// ref input
// export default class SearchBar extends Component {
// 	handleSearch = () => {
// 	    console.log(this.searchInput.value)
// 	}
// 	render () {
// 	    return (
// 	        <input
// 	            ref={(input) => (this.searchInput = input)}
// 	            type="search"
// 	            placeholder="Enter search term"
// 	            onChange={this.handleSearch}
// 	        />
// 	    )
// 	}
// }
