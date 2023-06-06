import ReactDOM from 'react-dom'
import { useLoaderData } from 'react-router-dom'
import { useContext, useEffect, useReducer } from 'react'
import classes from "./GachaPage.module.css"
import Header from "../components/gacha/Header"
import Machine from "../components/gacha/Machine"
import Navigation from "../components/gacha/Navigation"
import GachaModal from "../components/gacha/GachaModal"
import UserMachineContext from '../context/UserMachineContext'

let GachaPage = (props) => {
  const machineCtx = useContext(UserMachineContext)
  const data = useLoaderData()
  useEffect(() => {
    machineCtx.initMachine(data.machine, data.tokens, data.collectedList)
  }, [])

  const updateModal = (_state, action) => {
    console.log(_state, action)
    switch (action) {
      case "SHOW_COLLECTION": return { isOpen: true, type: "COLLECTION" }
      case "SHOW_MINIGAME": return { isOpen: true, type: "MINIGAME" }
      case "SHOW_SETTINGS": return { isOpen: true, type: "SETTINGS" }
      default: return { isOpen: false, type: null }
    }
  }

  const [modalState, dispatchModal] = useReducer(updateModal, { isOpen: false, type: null })
  const closeModal = () => { dispatchModal(null) }
  const showCollection = () => { dispatchModal("SHOW_COLLECTION") }
  const showMinigame = () => { dispatchModal("SHOW_MINIGAME") }
  const showSettings = () => { dispatchModal("SHOW_SETTINGS") }

  return (
    <div className={classes.pageContent}>
      {modalState.isOpen && ReactDOM.createPortal(<GachaModal type={modalState.type} closeModal={closeModal} />, document.getElementById("modal"))}
      <Header />
      <Machine />
      <Navigation showCollection={showCollection} showMinigame={showMinigame} showSettings={showSettings} />
    </div>
  );
}

export const MachineLoader = (request, params) => {
  // TODO: Request to setup server with db link on loader -> also add loading page
  // return machine
  const machine = {
    id: "AAA",
    name: "Gacha Machine Aaa",
    totalCount: 5
  }
  const userMachine = {
    machine: machine, 
    collectedList: [
      {
        id: "object_1",
        name: "Object 1",
        description: "This is a mock object",
        image: "http://placekitten.com/300/300"
      },
      {
        id: "object_2",
        name: "Object 2",
        description: "This is a mock object",
        image: "http://placekitten.com/300/300"
      }
    ],
    tokens: 5
  }

  return userMachine
}

export default GachaPage