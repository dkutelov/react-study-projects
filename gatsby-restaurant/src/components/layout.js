import React from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"

import "./layout.css"

import Navbar from "./common/navbar"
import Footer from "./common/Footer"

const Layout = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    <Navbar />
    <div style={{ marginTop: "55px" }}>{children}</div>
    <Footer />
  </React.Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans',sans-serif;
  color: #333333;
  background:  #fff; 
}
`

export default Layout
