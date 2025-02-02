import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
//import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useTranslations from "../components/useTranslations"
//import Layout from "../components/layout"
import MainMenu from "../components/MainMenu/MainMenu"
import Seo from "../components/seo"
import * as styles from "../style/style.module.scss"
import "../style/style.css"

import w from "../images/wheel.gif"

const IndexPage = ({data, pageContext: { locale } }) => {

  const allModelsWithoutDublicates = data.allDirectory.nodes

  const [modelNumber, setModelNumber] = useState(null)
  const [currentData, setCurrentData] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [isOnline, setIsOnline] = useState(true)
  console.log(modelNumber)
  const allImages = []
  data.allFile.nodes.map(node => {
    allImages.push(node.childImageSharp)
  })

  useEffect(() => {

    if (window.navigator.onLine) {
      setIsOnline(true)
    } else {
      setIsOnline(false)
    }
  })

  const { 
          choose_model
  } = useTranslations()

  useEffect(() => {
    const currentImgNode = data.allFile.nodes.filter(node => {
      return node.relativeDirectory === modelNumber
    })
    currentImgNode.length > 0 && setCurrentImage(currentImgNode[0]?.childImageSharp?.gatsbyImageData)

    const currentDataNode = data.allMdx.nodes.filter(node => {
      return node.frontmatter.title === modelNumber && node.fields.locale === locale
    })
    currentDataNode.length > 0 && setCurrentData(currentDataNode[0].body)
    
  }, [modelNumber, data.allFile.nodes])

  return (
    <>
      <MainMenu />
      <div className={styles.mainWrapper}>
        <label>

          <select name="selectedSegment" enabled="true" onChange={e => setModelNumber(e.target.value)}>
            <option value="">{choose_model}</option>
            {allModelsWithoutDublicates.map(node => {
              return (
                <option key={node.relativePath} value={node.relativePath}>{node.relativePath}</option>
              )
            })}
          </select>
          
        </label>

        <div className={styles.shieldTop}></div>

        <div className={styles.infoWrapper} style={(modelNumber && isOnline) ? {display: "block"} : {display: "none"}} dangerouslySetInnerHTML={{ __html: modelNumber ? currentData : '' }}></div>

        <div className={styles.dataImage} style={(modelNumber && !isOnline) || (modelNumber && !currentData) ? {display: "block"} : {display: "none"}}>
          <GatsbyImage 
            image={currentImage}
            alt="img"
          />
        </div>

        <img className={styles.preloader} src={w} alt="preloader" style={!modelNumber ? {display: "none"} : {display: "block"}}></img>

        <div>
          {allImages.map(img => {

            return (
              <div key={img.id} style={{height: "1px"}}>
                <GatsbyImage 
                  style={{maxHeight: "1px"}}
                  imgStyle={{
                    width: "1px",
                    maxHeight: "1px"
                  }}
                  image={img.gatsbyImageData}
                  alt="img"
                />
              </div>
            )
          })}
        </div>

        <div className={styles.shieldBottom}></div>
      
      </div>
    </>
  )
}

export const Head = () => <Seo title="Vyroba" />


export const query = graphql`
query {
  allFile(filter: {sourceInstanceName: {eq: "cabels"}, extension: {eq: "jpg"}}) {
    nodes {
      relativeDirectory
      childImageSharp {
        gatsbyImageData
        id
      }
    }
  }
  allDirectory(
    filter: {relativePath: {ne: ""}, sourceInstanceName: {eq: "cabels"}}
  ) {
    nodes {
      relativePath
    }
  }
  allMdx {
    nodes {
      frontmatter {
        title
      }
      body
      fields {
        locale
      }
    }
  }
}
`
/* export const query = graphql`
query {
  allFile(filter: {sourceInstanceName: {eq: "cabels"}, extension: {eq: "mdx"}}) {
    nodes {
      relativeDirectory
      childMdx {
        frontmatter {
          title
        }
        body
        fields {
          locale
        }
      }
    }
  }
  allDirectory(
    filter: {relativePath: {ne: ""}, sourceInstanceName: {eq: "cabels"}}
  ) {
    nodes {
      relativePath
    }
  }
}
` */

export default IndexPage
