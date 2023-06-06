import classes from "./Machine.module.css"

const Machine = () => { 
  // TOOD: Send request to server on spin
  return <div className={classes.layout}>
    <div className={classes.machine}></div>
    <button> Spin Machine </button>
  </div>
}

export default Machine