import { useNavigate } from "react-router-dom"
import classes from "./MachineCard.module.css"
import UIClasses from "../../UI/UI.module.css"

const MachineCard = (props) => {
  let navigate = useNavigate()

  const redirectToMachine = () => {
    navigate(`/app/gacha/${props.id}`)
  }

  return <div onClick={redirectToMachine} className={`${classes.card} ${UIClasses.bgPrimary}`}>
    <div>
      <div className={classes.title}>{props.name}</div>
      <div>{props.itemsCollected}/{props.totalItems} Collected</div>
    </div>
    {props.itemsCollected === props.totalItems && <img className={classes.icon} src="/app/assets/site/medalIcon.png" alt="completed"/>}
  </div>
}

export default MachineCard