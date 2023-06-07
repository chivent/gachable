import classes from "./Machine.module.css"
import { useContext } from 'react'
import UserMachineContext from '../../context/UserMachineContext'

const Machine = () => { 
  const machineCtx = useContext(UserMachineContext)
  return <div className={classes.layout}>
    <div className={classes.machine}></div>
    <button onClick={machineCtx.spendToken}> Spin Machine </button>
  </div>
}

export default Machine