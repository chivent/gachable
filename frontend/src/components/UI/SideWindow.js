import classes from "./SideWindow.module.css"
import {Fragment, useContext} from "react"
import WindowContext from "../../context/WindowContext"

const SideWindow = (props) => { 
  const winCtx = useContext(WindowContext)
  return <Fragment>
    <div id="backdrop" className={classes.backdrop} onClick={winCtx.closeWindow} />
    <div className={classes.cardContent}>
      <div className={classes.cardHeader}>
        <button className={classes.collapseBtn} onClick={winCtx.closeWindow}> &gt;&gt; </button>
      </div>
      <div className={classes.cardBody}>
        {props.children}
      </div>
    </div>
  </Fragment>
}

export default SideWindow