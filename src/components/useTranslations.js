import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./layout"

const useTranslations = () => {

  const { locale } = React.useContext(LocaleContext)

  const { rawData } = useStaticQuery(query)

  const simplified = rawData?.edges?.map(item => {
    return {
      name: item?.node?.name,
      translations: item?.node?.childTranslationsJson,
    }
  })

  const { translations } = simplified.filter(lang => lang.name === locale)[0]

  return translations
}

export default useTranslations

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          childTranslationsJson {
            choose_segment
            choose_model
            equipment
            watch_video
            seo_title
            seo_description
            four_o_four_title
            four_o_four_text
          }
        }
      }
    }
  }
`