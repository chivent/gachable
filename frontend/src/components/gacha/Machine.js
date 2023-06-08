import classes from "./Machine.module.css"
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import UserMachineContext from '../../context/UserMachineContext'
import MockServerContext from '../../context/MockServerContext'
import WindowContext from "../../context/WindowContext"
import ItemView from "./collection/ItemView"

const Machine = () => { 
  const machineCtx = useContext(UserMachineContext)
  const serverCtx = useContext(MockServerContext)
  const winCtx = useContext(WindowContext)
  const spendToken = async() => { 
    const item = await machineCtx.spendToken(serverCtx, winCtx)
    console.log(item)
    winCtx.updateWindowContent(<ItemView item={item} />)
  }
  return <div className={classes.layout}>
    {winCtx.windowContent && createPortal(winCtx.windowContent, document.getElementById("overlay"))}
    <div className={classes.machine}></div>
    <button onClick={spendToken}> Spin Machine </button>
  </div>
}

export default Machine