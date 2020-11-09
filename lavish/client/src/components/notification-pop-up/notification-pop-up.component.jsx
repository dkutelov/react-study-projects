import React, { useState } from "react"

import { useInterval } from "../../utils/useInterval"

import {
  NotificationContainer,
  NotificationTitle
} from "./notification-pop-up.styles"

const NotificationPopUp = ({ type, title, children, time }) => {
  const [showNotification, setShowNotification] = useState(true)

  useInterval(() => setShowNotification(false), time)

  return (
    <NotificationContainer type={type} show={showNotification}>
      {title && <NotificationTitle>{title}</NotificationTitle>}
      {children}
    </NotificationContainer>
  )
}

export default NotificationPopUp
