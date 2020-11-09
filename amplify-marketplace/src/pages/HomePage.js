import React, { Fragment } from "react"
import { API, graphqlOperation } from "aws-amplify"

import { searchMarkets } from "../graphql/queries"
import NewMarket from "../components/NewMarket"
import MarketList from "../components/MarketList"
import Search from "../components/Search"

class HomePage extends React.Component {
  state = {
    searchTerm: "",
    searchResults: [],
    isSearching: false
  }

  handleSearchChange = searchTerm => this.setState({ searchTerm })
  handleClearSearch = () => this.setState({ searchTerm: "", searchResults: [] })

  handleSearch = async event => {
    event.preventDefault()
    try {
      const { searchTerm } = this.state
      const filter = {
        or: [
          { name: { match: searchTerm } },
          { owner: { match: searchTerm } },
          { tags: { match: searchTerm } }
        ]
      }
      const sort = {
        field: "createdAt",
        direction: "desc"
      }

      this.setState({ isSearching: true })
      const { data } = await API.graphql(
        graphqlOperation(searchMarkets, { filter, sort })
      )
      this.setState({
        searchResults: data.searchMarkets.items,
        isSearching: false,
        searchTerm: ""
      })
    } catch (error) {}
  }

  render() {
    return (
      <Fragment>
        <NewMarket />
        <Search
          searchTerm={this.state.searchTerm}
          isSearching={this.state.isSearching}
          handleSearchChange={this.handleSearchChange}
          handleClearSearch={this.handleClearSearch}
          handleSearch={this.handleSearch}
        />
        <MarketList searchResults={this.state.searchResults} />
      </Fragment>
    )
  }
}

export default HomePage
