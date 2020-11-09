import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose } from "redux"

import { selectIsFetching } from "../../redux/shop/shop.selector.js"

import withSpinner from "../with-spinner/with-spinner.component"
import CollectionsOverview from "./collections-overview.component"

const mapStateToProps = state =>
  createStructuredSelector({
    isFetching: selectIsFetching
  })

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer
