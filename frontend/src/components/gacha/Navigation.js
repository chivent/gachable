import classes from "./Navigation.module.css"
import { PageLayouts } from "../../pages/GachaPage"
import { useNavigate } from "react-router-dom"

const Navigation = (props) => { 
  let navigate = useNavigate()
  const redirectToList = () => navigate(`/app`)
  const showMachine = () => { props.dispatchContent(PageLayouts.machine) }
  const showCollection = () => { props.dispatchContent(PageLayouts.collection) }

  return <div className={classes.barLayout}>
    <div className={classes.btnGroup}>
      <button onClick={showMachine}> M </button>
      <button onClick={showCollection}> C</button>
    </div>
    <button onClick={redirectToList}> B </button>
  </div>
}

export default Navigation