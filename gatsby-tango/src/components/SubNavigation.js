import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const SubNavigation = ({ menuItems }) => (
  <>
    <span>&#8964;</span>
    <ul>
      {menuItems.map((child, iChild) => (
        <li key={iChild}>
          <Link to={child.url} activeClassName="nav-active">
            {child.title}
          </Link>
        </li>
      ))}
    </ul>
  </>
)

SubNavigation.propTypes = {
  menuItems: PropTypes.array,
}

export default SubNavigation
