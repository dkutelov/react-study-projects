import React, { useState, useEffect, createContext, useCallback } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Auth, Hub, API, graphqlOperation } from "aws-amplify"
import { Authenticator, AmplifyTheme } from "aws-amplify-react"
import "./App.css"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import MarketPage from "./pages/MarketPage"
import ProfilePage from "./pages/ProfilePage"
import { getUser } from "./graphql/queries"
import { registerUser } from "./graphql/mutations"

export const UserContext = createContext()

export default () => {
  const [user, setUser] = useState(null)
  const registerNewUser = useCallback(async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    }
    const { data } = await API.graphql(graphqlOperation(getUser, getUserInput))
    // if we do not get user, he has not been registered before
    if (!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        }

        const newUser = await API.graphql(
          graphqlOperation(registerUser, { input: registerUserInput })
        )

        console.log(newUser)
      } catch (err) {
        console.error("Error registering new user!", err)
      }
    }
  }, [])

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    Hub.listen("auth", capsule => {
      switch (capsule.payload.event) {
        case "signIn":
          console.log("signed in")
          getUserData()
          registerNewUser(capsule.payload.data)
          break
        case "signUp":
          console.log("sign up")
          break
        case "signOut":
          console.log("sign out")
          setUser(null)
          break
        default:
          return
      }
    })
  }, [registerNewUser])

  const getUserData = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    authUser ? setUser(authUser) : setUser(null)
  }

  const handleSignOut = async () => {
    try {
      await Auth.signOut()
    } catch (err) {
      console.error("Error signing out user", err)
    }
  }

  return !user ? (
    <Authenticator theme={theme} />
  ) : (
    <UserContext.Provider value={{ user }}>
      <Router>
        <React.Fragment>
          <Navbar user={user} signOut={handleSignOut} />
          <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route
              exact
              path="/market/:marketId"
              component={({ match }) => (
                <MarketPage user={user} marketId={match.params.marketId} />
              )}
            />
          </div>
        </React.Fragment>
      </Router>
    </UserContext.Provider>
  )
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  },
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb",
    marginLeft: "-15px",
    marginRight: "-15px"
  }
}
