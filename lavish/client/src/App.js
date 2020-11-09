import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./App.css"

import Header from "./components/header/header.component.jsx"
import HomePage from "./pages/homepage/homepage.component"
import ShopPage from "./pages/shop/shop.component.jsx"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx"
import CheckoutPage from "./pages/checkout/checkout.component.jsx"

import { selectCurrentUser } from "./redux/user/user.selector"
import { checkUserSession } from "./redux/user/user.actions"

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    currentUser: selectCurrentUser
  })

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)