import React, { useState } from "react"
import { connect } from "react-redux"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.actions.js"

import { SignInContainer, SignInButtons, SignInTitle } from "./sign-in.styles"

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setCredentials({ ...userCredentials, [name]: value })
  }

  const { email, password } = userCredentials
  const handleSubmit = async e => {
    e.preventDefault()
    await emailSignInStart(email, password)
    setCredentials({
      email: "",
      password: ""
    })
  }

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <SignInButtons>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </SignInButtons>
      </form>
    </SignInContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
})

export default connect(
  null,
  mapDispatchToProps
)(SignIn)
