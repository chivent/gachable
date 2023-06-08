import classes from "./Header.module.css"
import { useContext } from 'react'
import UserMachineContext from '../../context/UserMachineContext'

const Header = () => { 
  const { machine } = useContext(UserMachineContext)
  return (<div className={classes.layout}>
    <h2> {machine.name}</h2>
    <p> Tokens xInfinite </p>
  </div>)
}

export default Header