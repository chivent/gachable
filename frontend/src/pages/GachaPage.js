import { useLoaderData } from 'react-router-dom'
import { useContext, useEffect, useReducer } from 'react'
import classes from "./GachaPage.module.css"

import Header from "../components/gacha/Header"
import Navigation from "../components/gacha/Navigation"
import Machine from "../components/gacha/Machine"
import Collection from "../components/gacha/Collection"
import MiniGame from "../components/gacha/MiniGame"

import UserMachineContext from '../context/UserMachineContext'
import MockServerContext from '../context/MockServerContext'
import { apiRetrieveProgress } from '../ApiRequests.js'

export const PageLayouts = {
  machine: "MACHINE",
  collection: "COLLECTION",
  minigame: "MINIGAME"
}

const GachaPage = () => {
  const machineCtx = useContext(UserMachineContext)
  const serverCtx = useContext(MockServerContext)
  const data = useLoaderData()
  useEffect(() => {
    machineCtx.initMachine(data.userMachine)
    serverCtx.storeInit(data.itemIds)
  }, []) 

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

export const MachineLoader = (request) => {
  return apiRetrieveProgress(request.params.id, "machineURL")
}

export default GachaPage