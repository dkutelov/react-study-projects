import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import {
  checkIfEmailExistsStart,
  userSignUpStart
} from "../../redux/user/user.actions.js"
import {
  selectIsChecking,
  emailExists
} from "../../redux/user/user.selector.js"
import { isEmail } from "../../utils/form-validation.js"

import {
  SignUpContainer,
  SignUpTitle,
  SmallSpinner,
  SuccessMark,
  TakenMark
} from "./sign-up.styles"

// change styling of disabled button
// 1-2 sec delay
// fire an action to fetchStart
// saga to search
// use withSpinner HOC
// green success icon

const SignUp = ({
  checkIfEmailExistsStart,
  userSignUpStart,
  emailExists,
  isChecking
}) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const checkIfEmailExists = email => {
    // check basic email elent
    const validEmail = isEmail(email)
    if (validEmail) {
      checkIfEmailExistsStart(email)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (name === "email") {
      checkIfEmailExists(value)
    }
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const { email, password, confirmPassword, displayName } = userCredentials
  const handleSubmit = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    userSignUpStart({ email, password, displayName })
  }

  const validEmail = isEmail(email)
  return (
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        {isChecking && validEmail && <SmallSpinner />}
        {emailExists !== null &&
          validEmail &&
          !isChecking &&
          (!emailExists ? (
            <SuccessMark>&#10004;</SuccessMark>
          ) : (
            <TakenMark>Email already exists &#10006;</TakenMark>
          ))}
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm password"
          required
        />
        <div className="buttons">
          <CustomButton disabled={emailExists} type="submit">
            Sign Up
          </CustomButton>
        </div>
      </form>
    </SignUpContainer>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    emailExists: emailExists,
    isChecking: selectIsChecking
  })

const mapDispatchToProps = dispatch => ({
  checkIfEmailExistsStart: email => dispatch(checkIfEmailExistsStart(email)),
  userSignUpStart: userData => dispatch(userSignUpStart(userData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
