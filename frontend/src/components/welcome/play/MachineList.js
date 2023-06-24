import MachineCard from "./MachineCard"
import classes from "./MachineCard.module.css"
import listClasses from "./MachineList.module.css"
import UIClasses from "../../UI/UI.module.css"

const MachineList = (props) => { 
  const howTo = () => { 
    return <div className={`${listClasses.howTo} ${UIClasses.textHelp}`}>
      <p className={listClasses.howToTitle}> It's easy to start: </p>
      <ol>
        <li> Get a machine link, see 'Create' if you'd like to make your own. </li>
        <li> Play on a new machine by adding the machine link in form. </li>
        <li> Start spinning and collect them all! </li>
      </ol>
    </div>
  }
  return <div className={UIClasses.spaceBetweenY}>
    <div className={`${classes.hollowCard} ${UIClasses.borderPrimary} ${UIClasses.textPrimary}`} onClick={props.toggleForm}>+ Play on new machine</div>
    {
      props.machines.map(machine => { 
        return ( <MachineCard {...machine} key={machine.id}/>)
      })
    }
    {props.machines.length === 0 && howTo()}
  </div>
}

export default MachineList