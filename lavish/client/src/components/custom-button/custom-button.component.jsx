import React from "react"

import { CustomButtonContainer } from "./custom-button.styles"

const CustomButton = props => {
  return (
    <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
  )
}

export default CustomButton

// const CustomButton = ({
//   children,
//   isGoogleSignIn,
//   inverted,
//   ...otherProps
// }) => {
//   return (
//     <button
//       className={`${inverted ? "inverted" : ""} ${
//         isGoogleSignIn ? "google-sign-in" : ""
//       } custom-button`}
//       {...otherProps}>
//       {children}
//     </button>
//   )
// }
