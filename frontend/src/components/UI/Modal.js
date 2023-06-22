import classes from "./Modal.module.css"
import {Fragment, useContext} from "react"
import WindowContext from "../../context/WindowContext"
import UIClasses from "./UI.module.css"

const Modal = (props) => { 
  const winCtx = useContext(WindowContext)
  return <Fragment>
    <div id="backdrop" className={classes.backdrop} onClick={winCtx.closeWindow} />
    <div>
    <div className={classes.cardContent}>
      <div className={`${classes.cardHeader} ${UIClasses.bgPrimary}`}>
        <h2 className={classes.title}>{props.title}</h2>
        <div className={classes.collapseBtn} onClick={winCtx.closeWindow}> X </div>
      </div>
      <div className={classes.cardBody}>
        {props.children}
      </div>
    </div>
    </div>
  </Fragment>
}

export default Modal