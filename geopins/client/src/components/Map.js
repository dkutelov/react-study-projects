import React, { useState, useEffect, useContext } from "react"
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl"
import { withStyles } from "@material-ui/core/styles"
// import Button from "@material-ui/core/Button"
// import Typography from "@material-ui/core/Typography"
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone"

import PinIcon from "./PinIcon"
import Blog from "./Blog"
import Context from "../context"
import { useClient } from "../client"
import { GET_PINS_QUERY } from "../graphql/queries"

const INITIAL_VIEWPORT = {
  latitude: 42.6975,
  longitude: 23.3218,
  zoom: 13
}

const Map = ({ classes }) => {
  const { state, dispatch } = useContext(Context)
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)
  const client = useClient()

  useEffect(() => {
    const getUserPosition = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            console.log(latitude, longitude)
            setViewport({ ...viewport, latitude, longitude })
            setUserPosition({ latitude, longitude })
          },
          err => {
            console.error(err)
          },
          { timeout: 10000 }
        )
      }
    }
    getUserPosition()
  }, [viewport])

  useEffect(() => {
    getPins()
  }, [])

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return
    if (!state.draft) {
      dispatch({
        type: "CREATE_DRAFT"
      })
    }
    const [longitude, latitude] = lngLat
    console.log(longitude, latitude)
    dispatch({
      type: "UPDATE_DRAFT",
      payload: { longitude, latitude }
    })
  }

  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY)
    dispatch({ type: "GET_PINS", payload: getPins })
  }

  return (
    <div className={classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken="pk.eyJ1IjoiZGFyaWt1dGVsb3YiLCJhIjoiY2p5NnVyZDB1MGtoaTNscTBmajE1c2wxcyJ9.TW1NWzNLYqIOnFM2g9f8GA"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        {...viewport}
        onClick={handleMapClick}
        onViewportChange={newviewport => setViewport(newviewport)}>
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newviewport => setViewport(newviewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}>
            <PinIcon size={40} color="red" />
          </Marker>
        )}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}>
            <PinIcon size={40} color="hotpink" />
          </Marker>
        )}
        {state.pins.map(pin => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}>
            <PinIcon size={40} color="darkblue" />
          </Marker>
        ))}
      </ReactMapGL>
      <Blog />
    </div>
  )
}

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
}

export default withStyles(styles)(Map)
