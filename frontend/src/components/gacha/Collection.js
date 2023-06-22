import { Fragment, useContext, useState, useEffect } from "react"
import {createPortal} from 'react-dom'
import WindowContext from "../../context/WindowContext"
import CollectionItem from "./collection/CollectionItem"
import classes from "./Collection.module.css"
import ServerContext from '../../context/MockServerContext'
import {apiGetCollection} from '../../ApiRequests.js'

const Collection = () => { 
  const [collection, updateList] = useState({})
  const {windowContent} = useContext(WindowContext)
  const serverCtx = useContext(ServerContext)

  const updateCollection = async () => { 
    const list = await apiGetCollection(serverCtx)
    console.log(list)
    updateList(list)
  }

  useEffect(() => { 
    updateCollection()
  }, [])

  return <Fragment>
    {windowContent && createPortal(windowContent, document.getElementById("overlay"))}
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