import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { ReactComponent as Logo } from "../../assets/logo.svg"
import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
// redux
import { selectCurrentUser } from "../../redux/user/user.selector.js"
import { selectCartHidden } from "../../redux/cart/cart.selector.js"
import { userSignOutStart } from "../../redux/user/user.actions.js"
//styles
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles"

const Header = ({ currentUser, hidden, userSignOutStart }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">Shop</OptionLink>
        <OptionLink to="/contact">Contact</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={userSignOutStart}>
            Sign Out
          </OptionLink>
        ) : (
          <OptionLink to="/signin">Sign in</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {!hidden && <CartDropdown />}
    </HeaderContainer>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
  })

const mapDispatchToProps = dispatch => ({
  userSignOutStart: () => dispatch(userSignOutStart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
