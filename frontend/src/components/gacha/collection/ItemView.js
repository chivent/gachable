import Modal from "../../UI/Modal"
import UIClasses from "../../UI/UI.module.css"
import classes from "./ItemView.module.css"

const ItemView = ({ prefix, item }) => {
  return <Modal title={`${prefix || ""}${item.name}`}>
    <div className={classes.content}>
      {item.image && <div className={classes.image}><img src={item.image} alt="item"/></div>}
      {item.amount > 0 && <div className={`${classes.amount} ${UIClasses.textSecondary}`}> x{item.amount} Collected </div>}
      <div className={`${classes.description} ${UIClasses.textPrimaryDark}`}> {item.description} </div>
    </div>

  </Modal>
}

export default ItemView