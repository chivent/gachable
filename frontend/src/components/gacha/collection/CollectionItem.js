import classes from "./CollectionItem.module.css"
import ItemView from "./ItemView"
import WindowContext from "../../../context/WindowContext"
import {useContext} from 'react'

const CollectionItem = (props) => { 
  const winCtx = useContext(WindowContext)
  const openItemView = () => { 
    winCtx.updateWindowContent(<ItemView item={props.item} />)
  }

  return <div className={classes.item} onClick={openItemView}>
    <img className={classes.image} src={props.item.image} />
    <p className={classes.title}>{props.item.name}</p>
  </div>
}

export default CollectionItem