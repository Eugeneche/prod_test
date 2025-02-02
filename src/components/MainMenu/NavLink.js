import React from "react"
import LocalizedLink from "../localizedLink"

const linkStyles = {
    color: "#0007f3",
    textDecoration: "none"
}

const activeStyles = {
    color: "#a09efd",
    textDecoration: "underline"
}

const NavLink = ({ props, children, to }) => (
    <LocalizedLink to={to} style={linkStyles} activeStyle={activeStyles}>
      {children}
    </LocalizedLink>
)
  
  export default NavLink