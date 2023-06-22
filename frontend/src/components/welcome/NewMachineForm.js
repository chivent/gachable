import classes from "../UI/UI.module.css"
import formClasses from "./NewMachineForm.module.css"
import FormInput from "../UI/FormInput"
import useInput from "../../hooks/useInput"
import {useNavigate} from 'react-router-dom'

const NewMachineForm = (props) => {
  const validateUrl = (input) => {
    if (input.match(/^(?=https:\/\/).*((\.firebasedatabase\.app)|(\.firebaseio\.com))$/i)) {
      return null
    } else { 
      return "The url should be a firebase database URL"
    }
  }
  const {input: urlInput, dispatch: dispatchUrl} = useInput(validateUrl)
  
  const navigate = useNavigate()
  const createMachine = (e) => { 
    e.preventDefault()
    dispatchUrl({ action: "VALIDATE", value: urlInput.value })
    if (!urlInput.errorMsg) { 
    // Send browser request and navigate if success
    // Show loading page in mean time
      navigate("/app/gacha/AA")
    }
  }

  return <div className ={classes.columnCenter}>
    <form className={classes.wFull} onSubmit={createMachine} >
      <a onClick={props.toggleForm}>Return to machine list</a>
      <h3> Play on new machine </h3>
      <FormInput type="text" label="Machine URL" input={urlInput} dispatch={dispatchUrl} />
      <p className={formClasses.notes}>
        Any progress made on the machine will be tracked with the help of your cookies.
        <ul>
          <li> If you erase browser history for this site, you will lose any progress made on this machine. </li>
        </ul>
      </p>
      <button className={formClasses.button}>Start Playing</button>
    </form>
  </div>
}

export default NewMachineForm;