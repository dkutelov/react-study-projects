import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { selectProduct } from "../../redux/shop/shop.selector.js"
import { addItem } from "../../redux/cart/cart.actions.js"
import CustomButton from "../../components/custom-button/custom-button.component"

// styles
import {
  ProductContainer,
  ProductTopBlock,
  ProductImageContainer,
  ProductImage,
  ProductInfoBlock,
  PriceContainer,
  ProductDescription
} from "./product.styles"

const ProductPage = ({
  product: { id, name, imageUrl, price, description },
  addItem
}) => {
  return (
    <ProductContainer>
      <ProductTopBlock>
        <ProductImageContainer>
          <ProductImage imageUrl={imageUrl} />
        </ProductImageContainer>
        <ProductInfoBlock>
          <h1>{name}</h1>
          <PriceContainer>
            <h2>Price</h2>
            <span>${price}</span>
          </PriceContainer>
          <CustomButton onClick={() => addItem({ id, name, price, imageUrl })} style={{marginTop: '1rem'}}>
            Add To Cart
          </CustomButton>
        </ProductInfoBlock>
      </ProductTopBlock>
      <ProductDescription>
        <h2>Product Description</h2>
        {description}
      </ProductDescription>
    </ProductContainer>
  )
}

// match.params  - collectionId, productId
const mapStateToProps = (state, { match }) =>
  createStructuredSelector({
    product: selectProduct(match.params.collectionId, match.params.productId)
  })

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage)
