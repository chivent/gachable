import Modal from "../UI/Modal"
import CollectionView from "./collection/CollectionView"
import MiniGameView from "./miniGame/MiniGameView"
// import SettingsView from "./SettingsView"

const GachaModal = (props) => {
  
  let content = {layout: null, title: null}
  switch (props.type) { 
    case "COLLECTION":
      content.layout = <CollectionView />
      content.title = "Collection"
      break;
    case "MINIGAME":
      content.layout = <MiniGameView />
      content.title = "Earn Tokens"
      break;
    case "SETTINGS":
      content.layout = <div> Settings </div>
      content.title = "Settings"
      break;
    default: return
  }


  // TODO: Add modal to get nickname and also inform that cookies are needed if no nickname exists...
  return <Modal closeModal={props.closeModal} title={content.title} >
    {content.layout}
  </Modal>
}

export default GachaModal