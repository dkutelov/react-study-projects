import React, { useContext } from "react"

import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"

import { FirebaseContext } from "./firebase"

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const logLinks = `  
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;

  a {
    ${logLinks}
  }

  > h1 {
    margin: 0;
    flex-grow: 1;

    a {
      &:hover {
        text-decoration: none;
      }
    }
  }

  > div {
    margin: auto 0;
  }
`

const UserInfo = styled.div`
  text-align: right;
  color: lightgrey;
  > div {
    ${logLinks}
  }
`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext)
  console.log(user)

  function handleLogout() {
    firebase.logout().then(() => navigate("/login"))
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <div>
          {!!user && !!user.email ? (
            <UserInfo>
              Hello, {user.username || user.email}
              <div onClick={handleLogout}>Logout</div>
            </UserInfo>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Divider />
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
