import React, { useState } from "react"
import { Button, Dialog, Form, Input, Radio } from "element-react"

export default function UpdateProductDialog({
  updateProductDialog,
  closeDialog,
  description,
  price,
  shipped,
  handleUpdateProduct,
  productId
}) {
  const [updatedDescription, setUpdatedDescription] = useState(description)
  const [updatedPrice, setUpdatedPrice] = useState(price)
  const [updatedShipped, setUpdatedShipped] = useState(shipped)
  return (
    <Dialog
      title="Update Product"
      size="large"
      customClass="dialog"
      visible={updateProductDialog}
      onCancel={closeDialog}>
      <Dialog.Body>
        <Form labelPosition="top">
          <Form.Item label="Update description">
            <Input
              name="description"
              icon="information"
              placeholder="Product description"
              onChange={description => setUpdatedDescription(description)}
              value={updatedDescription}
            />
          </Form.Item>
          <Form.Item label="Set product price">
            <Input
              type="number"
              icon="plus"
              placeholder="Update Price ($USD)"
              onChange={price => setUpdatedPrice(price)}
              value={updatedPrice}
            />
          </Form.Item>
          <Form.Item label="Update Shipping">
            <div className="text-center">
              <Radio
                value="true"
                checked={updatedShipped === true}
                onChange={shipped => setUpdatedShipped(shipped)}>
                Shipped
              </Radio>
              <Radio
                value="false"
                checked={updatedShipped === false}
                onChange={shipped => setUpdatedShipped(shipped)}>
                Emailed
              </Radio>
            </div>
          </Form.Item>
        </Form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          type="primary"
          onClick={() =>
            handleUpdateProduct(
              productId,
              updatedDescription,
              updatedPrice,
              updatedShipped
            )
          }>
          Update
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
