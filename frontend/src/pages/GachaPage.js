import { useLoaderData } from 'react-router-dom'
import { useContext, useEffect, useReducer } from 'react'
import classes from "./GachaPage.module.css"
import Header from "../components/gacha/Header"
import Navigation from "../components/gacha/Navigation"
import Machine from "../components/gacha/Machine"
import Collection from "../components/gacha/Collection"
import MiniGame from "../components/gacha/MiniGame"
import UserMachineContext from '../context/UserMachineContext'

export let PageLayouts = {
  machine: "MACHINE",
  collection: "COLLECTION",
  minigame: "MINIGAME"
}

// Do all API calls 
// Then do all designs and replace 

let GachaPage = () => {
  const machineCtx = useContext(UserMachineContext)
  const data = useLoaderData()
  useEffect(() => {
    machineCtx.initMachine(data.machine, data.tokens, data.collectedList)
  }, []) // if machine changed, then change loader???

  const showContent = (_state, action) => {
    switch (action) {
      case PageLayouts.collection: return <Collection />
      case PageLayouts.minigame: return <MiniGame />
      default: return <Machine />
    }
  }
  const [content, dispatchContent] = useReducer(showContent, PageLayouts.machine, showContent)

  return (
    <div className={classes.pageLayout}>
      <Navigation dispatchContent={dispatchContent} />
      <div className={classes.pageContent}>
        <Header />
        {content}
      </div>
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