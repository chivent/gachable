import classes from "./WelcomePage.module.css"
import {useState, useEffect} from 'react'
import MachineList from '../components/welcome/MachineList'
import NewMachineForm from '../components/welcome/NewMachineForm'
import {useLoaderData} from 'react-router-dom'

const WelcomePage = () => {
  // TODO: Need loading page before loader data shows
  const data = useLoaderData()

  const [machineList, updateMachineList] = useState([])
  useEffect(() => { updateMachineList(data) }, [])

  const [ showForm, showFormHandler ] = useState(false)
  const toggleFormVisibility = () => {
    showFormHandler((prevState) => { 
      return !prevState;
    })
  }

  return (
    <div className={classes.pageContent}>
      <div className={classes.pageTitle}>
        <p>Welcome to</p>
        <h1>GachaMemories</h1>
      </div>

      <div className={classes.pageBody}>
        {!showForm && <MachineList toggleForm={toggleFormVisibility}  machines={machineList}/>}
        {showForm && <NewMachineForm toggleForm={toggleFormVisibility} />}
      </div>
    </div>
  );
}

export const WelcomeLoader = () => { 
  // TOOD: Replace with request
  const mockMachines = [
    { id: "AA", name: "Name AA", itemsCollected: 2, totalItems: 5 },
    { id: "BB", name: "Name BB", itemsCollected: 22, totalItems: 35 }
  ]

  // TODO: Remember to throw an error on failure
  return mockMachines
}

export default WelcomePage