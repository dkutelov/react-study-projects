import React from "react"
import { Storage, Auth, API, graphqlOperation } from "aws-amplify"
import { PhotoPicker } from "aws-amplify-react"
import {
  Form,
  Button,
  Input,
  Notification,
  Radio,
  Progress
} from "element-react"
//prettier - ignore

import aws_exports from "../aws-exports"
import { createProduct } from "../graphql/mutations"
import { convertDollarsToCents } from "../utils/index"
const photoPickerStyles = {
  formContainer: {
    margin: 0,
    padding: "0.8em"
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  sectionBody: {
    margin: 0,
    width: "250px"
  },
  sectionHeader: {
    padding: "0.2em",
    color: "var(--darkAmazonOrange)"
  },
  photoPickerButton: {
    display: "none"
  }
}

const initialState = {
  description: "",
  price: 0,
  shipped: true,
  imagePreview: "",
  image: "",
  isUploading: false,
  percentUploaded: 0
}

class NewProduct extends React.Component {
  state = { ...initialState }

  handleAddProduct = async () => {
    try {
      this.setState({ isUploading: true })
      // upload file
      const visibility = "public"
      const { identityId } = await Auth.currentCredentials()
      const fileName = `/${visibility}/${identityId}/${Date.now()}-${
        this.state.image.name
      }`
      const uploadedFile = await Storage.put(fileName, this.state.image.file, {
        contentType: this.state.image.type,
        progressCallback: progress => {
          const percentUploaded = Math.round(
            (progress.loaded / progress.total) * 100
          )
          this.setState({ percentUploaded })
        }
      })
      // upload file
      const file = {
        key: uploadedFile.key,
        bucket: aws_exports.aws_user_files_s3_bucket,
        region: aws_exports.aws_project_region
      }
      // create new product
      const input = {
        productMarketId: this.props.marketId,
        description: this.state.description,
        shipped: this.state.shipped,
        price: convertDollarsToCents(this.state.price),
        file
      }
      const result = await API.graphql(
        graphqlOperation(createProduct, { input })
      )
      console.log("uploaded", result)

      Notification({
        title: "Success",
        message: "Product succesfully created!",
        type: "success"
      })

      this.setState({ ...initialState })
    } catch (err) {
      console.log("Error adding product", err)
    }
  }

  render() {
    const {
      description,
      price,
      image,
      shipped,
      imagePreview,
      isUploading,
      percentUploaded
    } = this.state
    return (
      <div className="flex-center">
        <h2 className="header">Add new product</h2>
        <Form className="market-header">
          <Form.Item label="Add product description">
            <Input
              type="text"
              icon="information"
              placeholder="Description"
              onChange={description => this.setState({ description })}
              value={description}
            />
          </Form.Item>
          <Form.Item label="Set product price">
            <Input
              type="number"
              icon="plus"
              placeholder="Price ($USD)"
              onChange={price => this.setState({ price })}
              value={price}
            />
          </Form.Item>
          <Form.Item label="Is the Product Shipped or Emailed to the Customer">
            <div className="text-center">
              <Radio
                value="true"
                checked={shipped === true}
                onChange={() => this.setState({ shipped: true })}>
                Shipped
              </Radio>
              <Radio
                value="false"
                checked={shipped === false}
                onChange={() => this.setState({ shipped: false })}>
                Emailed
              </Radio>
            </div>
          </Form.Item>
          {imagePreview && (
            <img
              className="image-preview"
              src={imagePreview}
              alt="Product preview"
            />
          )}
          {percentUploaded > 0 && (
            <Progress
              type="circle"
              status="success"
              className="progress"
              percentage={percentUploaded}
            />
          )}
          <PhotoPicker
            theme={photoPickerStyles}
            title="Product Image"
            preview="hidden"
            onLoad={url => this.setState({ imagePreview: url })}
            onPick={url => this.setState({ image: url })}
          />
          <Form.Item>
            <Button
              disabled={!description || !price || !image || isUploading}
              type="primary"
              onClick={this.handleAddProduct}
              loading={isUploading}>
              {isUploading ? "Uploading ..." : "Add product"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default NewProduct
