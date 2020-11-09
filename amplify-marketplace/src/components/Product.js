import React from "react"
import { API, graphqlOperation } from "aws-amplify"
import { S3Image } from "aws-amplify-react"
// prettier-ignore
import { Notification, Popover, Button, Card} from "element-react";

import { updateProduct, deleteProduct } from "../graphql/mutations"

import { UserContext } from "../App"
import { convertCentsToDollars, convertDollarsToCents } from "../utils"
import PayButton from "./PayButton"
import UpdateProductDialog from "./UpdateProductDialog"

class Product extends React.Component {
  state = {
    updateProductDialog: false,
    deleteProductDialog: false
  }

  closeDialog = () => this.setState({ updateProductDialog: false })

  handleUpdateProduct = async (
    productId,
    updatedDescription,
    updatedPrice,
    updatedShipped
  ) => {
    try {
      this.setState({ updateProductDialog: false })
      const input = {
        id: productId,
        description: updatedDescription,
        price: convertDollarsToCents(updatedPrice),
        shipped: updatedShipped
      }
      await API.graphql(graphqlOperation(updateProduct, { input }))
      Notification({
        title: "Success",
        message: "Product successfully updated",
        type: "success",
        duration: 2000
      })

      //setTimeout(() => window.location.reload(), 4000)
    } catch (err) {
      console.log("Error updating product", err)
    }
  }

  handleProductDelete = async productId => {
    try {
      this.setState({ deleteProductDialog: false })
      const input = {
        id: productId
      }
      await API.graphql(graphqlOperation(deleteProduct, { input }))
      Notification({
        title: "Success",
        message: "Product successfully deleted",
        type: "success",
        duration: 2000
      })
    } catch (err) {
      console.error(`Failed to delete product with id: ${productId}`, err)
    }
  }

  render() {
    const { product } = this.props
    const { updateProductDialog, deleteProductDialog } = this.state

    return (
      <UserContext.Consumer>
        {({ user }) => {
          const isProductOwner = user && user.attributes.sub === product.owner
          return (
            <div className="card-container">
              <Card bodyStyle={{ padding: 0, minWidth: "200px" }}>
                {product.file && (
                  <S3Image
                    imgKey={product.file.key}
                    theme={{
                      photoImg: {
                        maxWidth: "100%",
                        maxHeight: "100%"
                      }
                    }}
                  />
                )}
                <div className="card-body">
                  <h3 className="m-0">{product.description}</h3>
                  <div className="items-center">
                    <img
                      src={`https://icon.now.sh/${
                        product.shipped ? "markunread_mailbox" : "mail"
                      }`}
                      alt="shipping icon"
                      className="icon"
                    />
                    {product.shipped ? "Shipped" : "Emailed"}
                  </div>
                  <div className="text-right">
                    <span className="m-1">
                      ${convertCentsToDollars(product.price)}
                    </span>
                    {!isProductOwner && (
                      <PayButton product={product} user={user} />
                    )}
                  </div>
                </div>
              </Card>
              {/* Update and delete product buttons */}
              <div className="text-center">
                {isProductOwner && (
                  <>
                    <Button
                      type="warning"
                      icon="edit"
                      className="m-1"
                      onClick={() =>
                        this.setState({
                          updateProductDialog: true
                        })
                      }
                    />
                    <Popover
                      placement="top"
                      width="160"
                      trigger="click"
                      visible={deleteProductDialog}
                      content={
                        <>
                          <p>Dou you want to delete this?</p>
                          <div className="text-right">
                            <Button
                              size="mini"
                              type="text"
                              className="m-1"
                              onClick={() =>
                                this.setState({
                                  deleteProductDialog: false
                                })
                              }>
                              Cancel
                            </Button>
                            <Button
                              size="mini"
                              type="primary"
                              className="m-1"
                              onClick={() =>
                                this.handleProductDelete(product.id)
                              }>
                              Confirm
                            </Button>
                          </div>
                        </>
                      }>
                      <Button
                        onClick={() =>
                          this.setState({
                            deleteProductDialog: true
                          })
                        }
                        type="danger"
                        icon="delete"
                      />
                    </Popover>
                  </>
                )}
              </div>
              <UpdateProductDialog
                updateProductDialog={updateProductDialog}
                closeDialog={this.closeDialog}
                description={product.description}
                price={convertCentsToDollars(product.price)}
                shipped={product.shipped}
                handleUpdateProduct={this.handleUpdateProduct}
                productId={product.id}
              />
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

export default Product
