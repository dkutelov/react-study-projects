import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import SubNavigation from './SubNavigation'
import { NavigationWrapper } from './styles/NavigationStyles'

const Navigation = () => {
  const {
    menu: {
      edges: [{ node: menu }],
    },
  } = useStaticQuery(graphql`
    query NavigationQuery {
      menu: allWordpressWpApiMenusMenusItems(
        filter: { wordpress_id: { eq: 5 } }
      ) {
        edges {
          node {
            items {
              title
              url
              wordpress_children {
                title
                url
              }
            }
          }
        }
      }
    }
  `)

  return (
    <NavigationWrapper>
      <ul>
        {menu.items.map((item, i) => (
          <li key={i}>
            <Link to={item.url} activeClassName="nav-active">
              {item.title}
            </Link>
            {item.wordpress_children && (
              <SubNavigation menuItems={item.wordpress_children} />
            )}
          </li>
        ))}
      </ul>
    </NavigationWrapper>
  )
}

export default Navigation
