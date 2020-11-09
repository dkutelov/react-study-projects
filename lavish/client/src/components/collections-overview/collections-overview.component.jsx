import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./collections-overview.styles.scss"

import CollectionPreview from "../collection-preview/collection-preview.component"
import { selectCollectionsForPreview } from "../../redux/shop/shop.selector.js"

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollection }) => (
        <CollectionPreview key={id} {...otherCollection} />
      ))}
    </div>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    collections: selectCollectionsForPreview
  })

export default connect(mapStateToProps)(CollectionsOverview)
