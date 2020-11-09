import React, { useState, useContext } from "react"
//import { Link } from "gatsby"

//import SEO from "../components/seo"
import { FirebaseContext } from "../components/firebase"
import { Form, Button, Input, ErrorMessage } from "../components/common"

const Login = () => {
  const { firebase } = useContext(FirebaseContext)
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { email, password } = formValues
      await firebase.login({ email, password })
    } catch (err) {
      setErrorMessage(err.message)
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
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
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
          required
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button block type="submit">
          Login
        </Button>
      </Form>
    </section>
  )
}

export default Login
