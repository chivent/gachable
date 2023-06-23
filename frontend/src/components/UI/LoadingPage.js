import classes from "./LoadingPage.module.css"
import UIClasses from "./UI.module.css"
import {Fragment, useContext} from "react"
import WindowContext from "../../context/WindowContext"

const Modal = () => { 
  const winCtx = useContext(WindowContext)
  return <Fragment>
    <div className={`${classes.backdrop} ${UIClasses.bgBase}`} onClick={winCtx.closeWindow} />
    <div className={classes.content}>
      <img className={classes.loader} src="/app/assets/site/loadingBall.png" alt="loader"/>
      <p className={UIClasses.textPrimaryDark}> Loading... </p>
    </div>
  </Fragment>
}

export default Modal