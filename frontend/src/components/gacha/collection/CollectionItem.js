import classes from "./CollectionItem.module.css"

const CollectionItem = (props) => { 
  return <div className={classes.item}>
    <img className={classes.image} src={props.item.image} />
    <p className={classes.title}>{props.item.name}</p>
  </div>
}

export default CollectionItem