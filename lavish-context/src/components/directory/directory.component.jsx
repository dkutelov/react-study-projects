import React, { useContext } from "react"

import MenuItem from "../menu-item/menu-item.component"
import DirectoriesContext from "../../context/directories/directories.context.js"
import "./directory.styles.scss"

const Directory = () => {
  const sections = useContext(DirectoriesContext)
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  )
}

export default Directory
