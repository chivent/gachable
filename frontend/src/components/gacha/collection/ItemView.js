import SideWindow from "../../UI/SideWindow"
import classes from "./ItemView.module.css"

const ItemView = ({ item }) => {
  return <SideWindow>
    <div className={classes.content}>
      {item.image && <img className={classes.image} src={item.image} />}
      <h2 className={classes.title}>{item.name}</h2>
      <div> {item.description} </div>
    </div>

  </SideWindow>
}

export default ItemView