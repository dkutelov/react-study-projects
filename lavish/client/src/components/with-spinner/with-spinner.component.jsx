import React from "react"

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles"

const withspinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  )
}

export default withspinner
