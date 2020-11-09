import React, { Component } from "react"
import styled from "styled-components"

import NavbarHeader from "./NavbarHeader"
import NavbarLinks from "./NavbarLinks"
import NavbarIcons from "./NavbarIcons"

export class Navbar extends Component {
  state = {
    navbarOpen: false,
  }

  toggleNavbar = () =>
    this.setState(prevState => ({ navbarOpen: !prevState.navbarOpen }))

  render() {
    const { navbarOpen } = this.state
    return (
      <NavWrapper>
        <NavbarHeader toggleNavbar={this.toggleNavbar} />
        <NavbarLinks navbarOpen={navbarOpen} />
        <NavbarIcons />
      </NavWrapper>
    )
  }
}

const NavWrapper = styled.nav`
  width: 100%;
  top: 0;
  position: fixed;
  height: 55px;
  background-color: white;
  z-index: 100;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`

export default Navbar
