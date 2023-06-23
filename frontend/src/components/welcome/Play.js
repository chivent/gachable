import {useState} from 'react'
import classes from "./Play.module.css"

import MachineList from './play/MachineList'
import NewMachineForm from './play/NewMachineForm'

const Play = (props) => {
  const [ showForm, showFormHandler ] = useState(false)
  const toggleFormVisibility = () => {
    showFormHandler((prevState) => { 
      return !prevState;
    })
  }

  return (
    <div className={classes.list}>
      {!showForm && <MachineList toggleForm={toggleFormVisibility}  machines={props.machineList}/>}
      {showForm && <NewMachineForm toggleForm={toggleFormVisibility} />}
    </div>
  );
}

export default Play