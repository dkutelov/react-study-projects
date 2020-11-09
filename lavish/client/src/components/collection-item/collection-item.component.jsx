import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import CustomButton from "../custom-button/custom-button.component"
import { addItem } from "../../redux/cart/cart.actions.js"
// styles
import {
  CollectionItemContainer,
  BackgroundImage,
  CollectionItemFooter,
  FooterName,
  FooterPrice,
  ItemLink
} from "./collection-item.styles"

const CollectionItem = ({
  id,
  name,
  price,
  imageUrl,
  addItem,
  match,
  title
}) => {
  return (
    <CollectionItemContainer>
      <ItemLink
        to={
          title
            ? `${match.url}/${title.toLowerCase()}/${id}`
            : `${match.url}/${id}`
        }>
        <BackgroundImage imageUrl={imageUrl} />
        <CollectionItemFooter>
          <FooterName>{name}</FooterName>
          <FooterPrice>${price}</FooterPrice>
        </CollectionItemFooter>
      </ItemLink>
      <CustomButton
        inverted
        isInProductListing
        onClick={() => addItem({ id, name, price, imageUrl })}>
        Add To Cart
      </CustomButton>
    </CollectionItemContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(
  null,
  mapDispatchToProps
)(withRouter(CollectionItem))
