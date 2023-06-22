import { Fragment, useContext, useState, useEffect } from "react"
import { createPortal } from 'react-dom'

import ServerContext from '../../context/MockServerContext'
import WindowContext from "../../context/WindowContext"
import { apiGetCollection } from '../../ApiRequests.js'

import CollectionItem from "./collection/CollectionItem"
import LoadingPage from "../UI/LoadingPage"
import classes from "./Collection.module.css"
import lClasses from "../UI/LoadingPage.module.css"

const Collection = () => { 
  const [collection, updateList] = useState({})
  const [loader, updateLoader] = useState(true)
  const {windowContent} = useContext(WindowContext)
  const serverCtx = useContext(ServerContext)

  const updateCollection = async () => { 
    updateLoader(true)
    const list = await apiGetCollection(serverCtx)
    updateList(list)
  }

  useEffect(() => { 
    updateCollection()
    setTimeout(() => {
      const backdrop = document.getElementsByClassName(lClasses.backdrop)[0]
      const content = document.getElementsByClassName(lClasses.content)[0]
      if (backdrop && content) {        
        backdrop.style.opacity = 0
        content.style.opacity = 0
        setTimeout(() => {
          updateLoader(false)
        }, 500)
      } 
    }, 1500)
  }, [])

  return <Fragment>
    {loader && createPortal(<LoadingPage />, document.getElementById("loader-overlay"))}
    {!loader && windowContent && createPortal(windowContent, document.getElementById("overlay"))}
    <div className={classes.list}>
      {
        Object.entries(collection).map(([id, item]) => { 
          return (<CollectionItem key={id} item={item}/>)
        })
      }
    </div>

  </Fragment>
}

export default Collection;