import { Fragment, useContext } from "react"
import {createPortal} from 'react-dom'
import UserMachineContext from '../../context/UserMachineContext'
import WindowContext from "../../context/WindowContext"
import CollectionItem from "./collection/CollectionItem"
import classes from "./Collection.module.css"

const Collection = () => { 
  const { collectedList } = useContext(UserMachineContext)
  const {windowContent} = useContext(WindowContext)

  return <Fragment>
    {windowContent && createPortal(windowContent, document.getElementById("overlay"))}
    <div className={classes.list}>
      {
        collectedList.map(item => { 
          return (<CollectionItem key={item.id} item={item}/>)
        })
      }
    </div>

  </Fragment>
}

export default Collection;