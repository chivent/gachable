import classes from "../UI/UI.module.css"

const NewMachineForm = (props) => {
  // TODO: Send creation request to server and redirect, archive the current machine in state ... => show loading page as well

  return <div className ={classes.columnCenter}>
    <form className={classes.wFull}>
      <a onClick={props.toggleForm}>Return to machine list</a>
      <h3> Play on new machine </h3>
      <div className={classes.formField}>
        <label> Machine Link </label>
        <input type="text" />
      </div>
      <button className={classes.wFull}>Start Playing</button>
    </form>
  </div>
}

export default NewMachineForm;