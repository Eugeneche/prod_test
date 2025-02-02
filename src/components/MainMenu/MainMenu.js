import React from "react"
//import { graphql, useStaticQuery } from "gatsby"
//import useTranslations from "../useTranslations"
import LanguagesSwitcher from "./LanguagesSwitcher"
//import NavLink from "./NavLink"
import * as style from "./_MainMenu.module.scss"



const MainMenu = () => {


  return (
    <nav>
      

      <LanguagesSwitcher />

    </nav>
  )
}

export default MainMenu