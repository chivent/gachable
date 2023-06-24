import {useState, Fragment} from 'react'

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
    <Fragment>
      {!showForm && <MachineList toggleForm={toggleFormVisibility}  machines={props.machineList}/>}
      {showForm && <NewMachineForm toggleForm={toggleFormVisibility} />}
    </Fragment>
  );
}

export default Play