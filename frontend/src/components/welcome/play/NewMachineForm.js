import classes from "../../UI/UI.module.css"
import formClasses from "./NewMachineForm.module.css"
import FormInput from "../../UI/FormInput"
import useInput from "../../../hooks/useInput"
import {useNavigate} from 'react-router-dom'
import { apiCreateMachine } from '../../../ApiRequests.js'

const NewMachineForm = (props) => {
  const validateUrl = (input) => {
    if (input.match(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/i)) {
      return null
    } else { 
      return "The url should be a firebase database URL"
    }
  }
  const {input: urlInput, dispatch: dispatchUrl} = useInput(validateUrl)
  
  const navigate = useNavigate()
  const createMachine = async (e) => { 
    e.preventDefault()
    dispatchUrl({ action: "VALIDATE", value: urlInput.value })
    if (!urlInput.errorMsg) { 
      const id = await apiCreateMachine(urlInput.value)
      navigate(`/app/gacha/${id}`)
    }
  }

  return <div className={`${classes.columnCenter} ${classes.textPrimary}`}>
    <form className={classes.wFull} onSubmit={createMachine} >
      <h2 className={`${formClasses.title} ${classes.textPrimaryDark}`}> Add a New Machine </h2>
      <FormInput type="text" label="Machine URL" input={urlInput} dispatch={dispatchUrl} />
      <div className={`${formClasses.notes} ${classes.textHelp}`}>
        <p> Any progress made on the machine will be tracked on your browser. </p>
        <p> If you erase browser history for this site, you will lose any progress made on this machine. </p>
      </div>
      <button className={`${formClasses.button} ${classes.bgPrimary}`}>Start Playing</button>
      <p className={`${formClasses.return} ${classes.textSecondary}`} onClick={props.toggleForm}>Return to machine list</p>
    </form>
  </div>
}

export default NewMachineForm;