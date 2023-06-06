import { Fragment, useContext } from "react"
import UserMachineContext from '../../../context/UserMachineContext'
import CollectionItem from "./CollectionItem"
import classes from "./CollectionView.module.css"

const CollectionView = () => { 
  const {collectedList} = useContext(UserMachineContext)
  return <Fragment>
    <div className={classes.list}>
      {
        collectedList.map(item => { 
          return (<CollectionItem key={item.id} item={item} />)
        })
      }
    </div>

  </Fragment>
}

export default CollectionView;