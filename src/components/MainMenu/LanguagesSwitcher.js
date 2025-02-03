import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import NavLink from "./NavLink"
import * as style from "./_MainMenu.module.scss"
import { LocaleContext } from "../layout"

import ukr from "../../images/ukr.svg"
import eng from "../../images/eng.svg"
import cze from "../../images/cze.svg"

import logo from "../../images/ak_white.png"


const LanguagesSwitcher = () => {

  const [path, setPath] = useState('')

  const locale = React.useContext(LocaleContext)

  useEffect(() => {
    if (window.location.pathname.match(`/${locale.locale}/`)) {
      setPath(window.location.pathname.slice(3))
    } else { 
      setPath(window.location.pathname)
    }
  })

  
  return (
    <div className={style.mainMenu}>
      {/* <NavLink to="/"> */}
        <img  className={style.logo} src={logo} alt="logo"></img>
      {/* </NavLink> */}
      
      <div className={style.flags}>
        <Link to={`${path}`} hrefLang="cs">
          <img className={style.flag} src={cze} alt="czech flag"></img>
        </Link>
        <Link to={`/en${path}`} hrefLang="en">
          <img className={style.flag} src={eng} alt="great britain flag"></img>
        </Link>
        <Link to={`/uk${path}`} hrefLang="uk">
          <img className={style.flag} src={ukr} alt="ukrainian flag"></img>
        </Link>
      </div>
    </div>

  )
}

export default LanguagesSwitcher