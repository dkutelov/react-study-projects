import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose } from "redux"

import {
  selectAreCollectionsLoaded
} from "../../redux/shop/shop.selector.js"

import withSpinner from "../../components/with-spinner/with-spinner.component"
import Collection from "./collection.component"

const mapStateToProps = state =>
  createStructuredSelector({
    isLoading: state => !selectAreCollectionsLoaded(state)
  })

const CollectionContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(Collection)

export default CollectionContainer
