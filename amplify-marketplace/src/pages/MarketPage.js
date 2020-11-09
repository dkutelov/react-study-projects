import React from "react"
import { Link } from "react-router-dom"
import { API, graphqlOperation } from "aws-amplify"
import { Loading, Tabs, Icon } from "element-react"

//import { getMarket } from "../graphql/queries"
import {
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct
} from "../graphql/subscriptions"
import NewProduct from "../components/NewProduct"
import Product from "../components/Product"

export const getMarket = `query GetMarket($id: ID!) {
  getMarket(id: $id) {
    id
    name
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
        file {
          key
        }
      }
      nextToken
    }
    tags
    owner
    createdAt
  }
}
`

class MarketPage extends React.Component {
  state = {
    market: null,
    isLoading: true,
    isMarketOwner: false
  }

  componentDidMount() {
    this.handleMarket()
    // subscriptions need to have reference on this to be able to unsubscribe
    this.createProductListener = API.graphql(
      graphqlOperation(onCreateProduct)
    ).subscribe({
      next: productData => {
        // get new product data from the mutation
        const createdProduct = productData.value.data.onCreateProduct
        // get previous product and make sure new product is not already in
        const prevProducts = this.state.market.products.items.filter(
          item => item.id !== createdProduct.id
        )
        const updatedProducts = [createdProduct, ...prevProducts]
        // create a shallow copy of market
        const market = { ...this.state.market }
        market.products.items = updatedProducts
        this.setState({ market })
      }
    })

    this.updateProductListener = API.graphql(
      graphqlOperation(onUpdateProduct)
    ).subscribe({
      next: productData => {
        // get updated product data from the mutation
        const updatedProduct = productData.value.data.onUpdateProduct
        // find updated product index
        const updatedProductIndex = this.state.market.products.items.findIndex(
          item => item.id === updatedProduct.id
        )
        const updatedProducts = [
          ...this.state.market.products.items.slice(0, updatedProductIndex),
          updatedProduct,
          ...this.state.market.products.items.slice(updatedProductIndex + 1)
        ]
        // update market and set state
        const market = {
          ...this.state.market
        }
        market.products.items = updatedProducts
        this.setState({
          market
        })
      }
    })

    this.deleteProductListener = API.graphql(
      graphqlOperation(onDeleteProduct)
    ).subscribe({
      next: productData => {
        // get deleted product data from the mutation
        const deletedProduct = productData.value.data.onDeleteProduct
        // remove deleted product from the products array
        const updatedProducts = this.state.market.products.items.filter(
          item => item.id !== deletedProduct.id
        )
        // update market and set state
        const market = { ...this.state.market }
        market.products.items = updatedProducts
        this.setState({ market })
      }
    })
  }

  componentWillUnmount() {
    this.createProductListener.unsubscribe()
    this.updateProductListener.unsubscribe()
    this.deleteProductListener.unsubscribe()
  }

  handleMarket = async () => {
    const { marketId } = this.props
    const { data } = await API.graphql(
      graphqlOperation(getMarket, { id: marketId })
    )

    this.setState({ market: data.getMarket, isLoading: false }, () =>
      this.checkMarketOwner()
    )
  }

  checkMarketOwner = () => {
    const { user } = this.props
    const { market } = this.state
    if (user) {
      this.setState({ isMarketOwner: user.username === market.owner })
    }
  }

  render() {
    const { market, isLoading, isMarketOwner } = this.state

    return isLoading ? (
      <Loading fullscreen={true} />
    ) : (
      <>
        <Link className="link" to="/">
          Back to markets list
        </Link>
        <span className="items-center pt-2">
          <h2 className="mb-mr">{market.name}</h2> - {market.owner}
        </span>
        <span className="items-center pt-2">
          <span style={{ color: "var(--lightSquidInk)", paddingBottom: "1em" }}>
            <Icon name="date" className="icon" />
            {market.createdAt}
          </span>
        </span>
        <Tabs type="border-card" value={isMarketOwner ? "1" : "2"}>
          {isMarketOwner && (
            <Tabs.Pane
              label={
                <>
                  <Icon name="plus" className="icon" />
                  Add Product
                </>
              }
              name="1">
              <NewProduct marketId={this.props.marketId} />
            </Tabs.Pane>
          )}
          <Tabs.Pane
            label={
              <>
                <Icon name="menu" className="icon" />
                Products {market.products.items.length}
              </>
            }
            name="2">
            <div className="product-list">
              {market.products.items.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </Tabs.Pane>
        </Tabs>
      </>
    )
  }
}

export default MarketPage
