import classes from "./CollectionItem.module.css"
import ItemView from "./ItemView"
import WindowContext from "../../../context/WindowContext"
import UIClasses from "../../UI/UI.module.css"
import {useContext} from 'react'

const CollectionItem = (props) => { 
  const winCtx = useContext(WindowContext)
  const openItemView = () => { 
    winCtx.updateWindowContent(<ItemView item={props.item} />)
  }

  return <div className={classes.item} onClick={openItemView}>
    <div className={classes.cell}>
      <img className={classes.image} src={props.item.image} alt="item"/>
    </div>
    <div className={classes.titleWrapper}>
      <p className={`${classes.title} ${UIClasses.textPrimaryDark}`}>{props.item.name}</p>
    </div>
  </div>
}

export default CollectionItem