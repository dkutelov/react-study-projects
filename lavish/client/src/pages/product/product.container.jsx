import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose } from "redux"

import { selectAreCollectionsLoaded } from "../../redux/shop/shop.selector.js"

import withSpinner from "../../components/with-spinner/with-spinner.component"
import Product from "./product.component"

const mapStateToProps = state =>
  createStructuredSelector({
    isLoading: state => !selectAreCollectionsLoaded(state)
  })

const ProductContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(Product)

export default ProductContainer
