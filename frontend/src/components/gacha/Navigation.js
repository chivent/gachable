import classes from "./Navigation.module.css"

const Navigation = (props) => { 
  return <div className={classes.barLayout}>
    <button onClick={props.showCollection}> Collection</button>
    <button onClick={props.showMinigame}> Earn Tokens</button>
    <button onClick={props.showSettings}> Settings </button>
  </div>
}

export default Navigation