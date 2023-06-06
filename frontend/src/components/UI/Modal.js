import classes from "./Modal.module.css"
import {Fragment} from "react"

const Modal = (props) => { 
  return <Fragment>
    <div id="backdrop" className={classes.backdrop}></div>
    <div className={classes.card}>
      <div className={classes.cardContent}>
        <div className={classes.cardHeader}>
          <h3>{props.title}</h3>
          <button onClick={props.closeModal}> Close </button>
        </div>
        {props.children}
      </div>
    </div>
  </Fragment>
}

export default Modal
//1H