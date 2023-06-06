import { useNavigate } from "react-router-dom"
import classes from "./MachineCard.module.css"

const MachineCard = (props) => { 
  let navigate = useNavigate()

  const redirectToMachine = () => {
    navigate(`/app/gacha/${props.id}`)
  }

  return <div onClick={redirectToMachine} className={classes.card}>
    <div>{props.name}</div>
    <div>{props.itemsCollected}/{props.totalItems}</div>
  </div>
}

export default MachineCard