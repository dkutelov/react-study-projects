import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"

import "./shop.styles.scss"

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overvew.container"
import CollectionContainer from "../collection/collection.container"
import ProductContainer from "../product/product.container"

import { fetchCollectionsStart } from "../../redux/shop/shop.actions.js"

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart()
  }, [fetchCollectionsStart])
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionContainer}
      />
      <Route
        exact
        path={`${match.path}/:collectionId/:productId`}
        component={ProductContainer}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(
  null,
  mapDispatchToProps
)(ShopPage)
