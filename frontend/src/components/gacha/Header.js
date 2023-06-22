import classes from "./Header.module.css"
import UIClasses from "../UI/UI.module.css"
import { useContext, useEffect, useState } from 'react'
import { PageLayouts } from "../../pages/GachaPage"
import UserMachineContext from '../../context/UserMachineContext'

const Header = (props) => { 
  const { machine, collectedList } = useContext(UserMachineContext)
  let [content, updateContent] = useState({title: machine.name, hide: []})
  useEffect(() => {
    switch (props.page) {
      case PageLayouts.collection: updateContent({title: "Collection"})
      break;
      default: updateContent({title: machine.name, hide: []})
    }
  }, [props.page])
  
  return (<div className={props.page === PageLayouts.machine ? classes.layout : classes.relativeLayout}>
    <h1 className={`${classes.title} ${UIClasses.textPrimary}`}> {content.title || machine.name}</h1>
    <p className={`${classes.details} ${UIClasses.textSecondary}`}> {Object.keys(collectedList).length}/{machine.totalCount} Collected </p>
  </div>)
}

export default Header