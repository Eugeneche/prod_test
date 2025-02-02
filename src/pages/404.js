import * as React from "react"
import useTranslations from "../components/useTranslations"
//import * as styles from "../style/_style.module.scss"

import Seo from "../components/seo"

const NotFoundPage = () => {

  const {
    four_o_four_title,
    four_o_four_text
  } = useTranslations()

 return (
  <>
    <div>
      <h1>{four_o_four_title}</h1>
      <p>{four_o_four_text}</p>
    </div>   
  </>
 )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
