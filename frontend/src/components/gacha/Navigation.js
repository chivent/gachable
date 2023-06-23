import classes from "./Navigation.module.css"
import UIClasses from "../UI/UI.module.css"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { PageLayouts } from "../../pages/GachaPage"

const Navigation = (props) => { 
  const [active, updateActive] = useState(props.page)
  const showMachine = () => { props.dispatchContent(PageLayouts.machine) }
  const showCollection = () => { props.dispatchContent(PageLayouts.collection) }

  const navigate = useNavigate()
  const backToHome = () => { 
    navigate("/app")
  }
  useEffect(() => {updateActive(props.page)}, [props.page])

  return <div className={`${classes.barLayout} ${UIClasses.bgPrimary}`}>
    <div className={classes.btnGroup}>
      <div className={active === PageLayouts.machine ? UIClasses.bgPrimaryLight : classes.inactive} onClick={showMachine} > <img src="/app/assets/site/machineIcon.png" alt="machine"/> </div>
      <div className={active === PageLayouts.collection ? UIClasses.bgPrimaryLight : classes.inactive} onClick={showCollection}> <img src="/app/assets/site/collectionIcon.png" alt="collection"/> </div>
    </div>
    <div className={classes.btnGroup}>
      <div className={classes.inactive} onClick={backToHome}> <img src="/app/assets/site/backIcon.png" alt="return"/> </div>
    </div>
  </div>
}

export default Navigation