import React, { useState, useContext } from "react"

import { Form, Button, Input, ErrorMessage } from "../components/common"
import { FirebaseContext } from "../components/firebase"

const Register = () => {
  const { firebase } = useContext(FirebaseContext)

  const [errorMessage, setErrorMessage] = useState("")
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const { username, email, password, confirmPassword } = formValues
    if (password === confirmPassword) {
      try {
        await firebase.register({ username, email, password })
      } catch (err) {
        setErrorMessage(err.message)
      }
    } else {
      setErrorMessage("The two passwords do not match!")
    }
  }

  function handleChange(e) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={formValues.username}
          type="text"
          placeholder="username"
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          value={formValues.email}
          type="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          value={formValues.password}
          type="password"
          placeholder="password"
          onChange={handleChange}
          minLength={6}
          required
        />
        <Input
          name="confirmPassword"
          value={formValues.confrimPassword}
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          minLength={6}
          required
        />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button block type="submit">
          Register
        </Button>
      </Form>
    </section>
  )
}

export default Register
