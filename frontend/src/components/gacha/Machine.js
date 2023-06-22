import classes from "./Machine.module.css"
import UIClasses from "../UI/UI.module.css"
import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import UserMachineContext from '../../context/UserMachineContext'
import WindowContext from "../../context/WindowContext"
import MockServerContext from "../../context/MockServerContext"
import ItemView from "./collection/ItemView"

const Machine = () => { 
  const machineCtx = useContext(UserMachineContext)
  const serverCtx = useContext(MockServerContext)
  const winCtx = useContext(WindowContext)
  const [spun, updateSpun] = useState(false)

  const spendToken = async () => {
    updateSpun(true)
    
    const item = await machineCtx.spendToken(serverCtx)
    await winCtx.updateWindowContent(<ItemView prefix="You got " item={item} />)
    const overlay = document.getElementById("overlay")
    if (overlay) {        
      overlay.style.opacity = 0
      overlay.style.pointerEvents = "none"
    } 
    setTimeout(function () {
      updateSpun(false)
      if (overlay) {
        overlay.style.opacity = 1
        overlay.style.pointerEvents = "auto"
      }
    }, 1250);
  }
  return <div className={classes.layout}>
    {winCtx.windowContent && createPortal(winCtx.windowContent, document.getElementById("overlay"))}
    <img className={`${classes.spinner} ${spun && classes.spun}`} src="/app/assets/site/spinner.png" onClick={spendToken} /> 
    <div className={classes.content}>
      <img src="/app/assets/site/machine.png" className={classes.machine}/>
      <p className={`${UIClasses.textHelp} ${classes.help}`} > Click the dial to spin for a gachapon! </p>
    </div>
  </div>
}

export default Machine