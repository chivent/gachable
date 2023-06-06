import MachineCard from "./MachineCard"
import classes from "./MachineCard.module.css"
import UIClasses from "../UI/UI.module.css"

const MachineList = (props) => { 
  return <div className={UIClasses.spaceBetweenY}>
    <div className={classes.card} onClick={props.toggleForm}>+ Play on new machine</div>
    {
      props.machines.map(machine => { 
        return ( <MachineCard {...machine} key={machine.id}/>)
      })
    }
  </div>
}

export default MachineList