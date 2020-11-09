import React from "react"

import {
  CollectionPreviewContainer,
  CollectionTitle,
  CollectionPreviewItems
} from "./collection-review.styles"

import CollectionItem from "../collection-item/collection-item.component"

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <CollectionTitle>{title.toUpperCase()}</CollectionTitle>
    <CollectionPreviewItems>
      {items.slice(0, 4).map(product => (
        <CollectionItem key={product.id} {...product} title={title} />
      ))}
    </CollectionPreviewItems>
  </CollectionPreviewContainer>
)

// filter((item,index) => index < 4).map(...) is faster then slice under 100 elements and then is vice versa

export default CollectionPreview
