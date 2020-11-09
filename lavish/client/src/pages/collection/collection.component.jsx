import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./collection.styles.scss"

import CollectionItem from "../../components/collection-item/collection-item.component"
import { selectCollection } from "../../redux/shop/shop.selector.js"

const CollectionPage = ({ collection, match }) => {
  const { title, items } = collection
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
            <CollectionItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    collection: selectCollection(ownProps.match.params.collectionId)
  })

export default connect(mapStateToProps)(CollectionPage)
