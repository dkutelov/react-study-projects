import React, { useState, useContext } from "react"
import { GraphQLClient } from "graphql-request"
import axios from "axios"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone"
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined"
import ClearIcon from "@material-ui/icons/Clear"
import SaveIcon from "@material-ui/icons/SaveTwoTone"

import Context from "../../context"
import { CREATE_PIN_MUTATION } from "../../graphql/mutations"
import { useClient } from "../../client"

const CreatePin = ({ classes }) => {
  const client = useClient()
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { state, dispatch } = useContext(Context)

  const handleDeleteDraft = () => {
    setTitle("")
    setImage("")
    setContent("")
    dispatch({ type: "DELETE_DRAFT" })
  }

  const handleSubmit = async evt => {
    try {
      evt.preventDefault()
      setSubmitting(true)
      const url = await handleImageUpload()
      // const idToken = window.gapi.auth2
      //   .getAuthInstance()
      //   .currentUser.get()
      //   .getAuthResponse().id_token
      // const client = new GraphQLClient("http://localhost:4000/graphql", {
      //   headers: {
      //     authorization: idToken
      //   }
      // })
      const { latitude, longitude } = state.draft
      const variables = {
        title,
        image: url,
        content,
        latitude,
        longitude
      }
      const { createPin } = await client.request(CREATE_PIN_MUTATION, variables)
      handleDeleteDraft()
      dispatch({ type: "CREATE_PIN", payload: createPin })
    } catch (err) {
      setSubmitting(false)
      console.error("Error creating pin", err)
    }
  }

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "geopins")
    data.append("cloud_name", "dariku")
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dariku/image/upload",
      data
    )
    return res.data.url
  }

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary">
        <LandscapeIcon className={classes.iconLarge} />
        Pin location
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          placeholder="Insert pin title"
          onChange={evt => setTitle(evt.target.value)}
        />
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={evt => setImage(evt.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}>
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name="content"
          label="Content"
          multiline
          rows="6"
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={evt => setContent(evt.target.value)}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleDeleteDraft}>
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handleSubmit}>
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  )
}

const styles = theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(1)
  },
  contentField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: 0
  }
})

export default withStyles(styles)(CreatePin)
