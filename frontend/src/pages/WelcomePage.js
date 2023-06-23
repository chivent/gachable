import classes from "./WelcomePage.module.css"
import UIClasses from "../components/UI/UI.module.css"

import {useState, useEffect, useReducer} from 'react'
import {useLoaderData} from 'react-router-dom'
import { apiGetMachines } from "../ApiRequests"

import Navigation from '../components/welcome/Navigation'
import Play from '../components/welcome/Play'
import About from '../components/welcome/About'
import Create from '../components/welcome/Create'

export const PageLayouts = {
  play: "PLAY",
  create: "CREATE",
  about: "ABOUT"
}

const WelcomePage = () => {
  const data = useLoaderData()

  const [machineList, updateMachineList] = useState([])
  useEffect(() => {
    updateMachineList(data)
  }, [data])
  
  const showContent = (_state, action) => {
    switch (action) {
      case PageLayouts.create: return PageLayouts.create
      case PageLayouts.about: return PageLayouts.about
      default: return PageLayouts.play
    }
  }
  const [content, dispatchContent] = useReducer(showContent, PageLayouts.play, showContent)
  
  return (
    <div className={classes.pageContent}>
      <div className={classes.pageTitle}>
        <img src="/app/assets/site/logo.png" alt="logo"/>
        <p className={UIClasses.textPrimary}>A do-it-yourself gachapon</p>
        <Navigation dispatchContent={dispatchContent} page={content} />
      </div>
      <div className={classes.pageBody}>
        {content === PageLayouts.play && <Play machineList={machineList} />}
        {content === PageLayouts.create && <Create /> }
        {content === PageLayouts.about && <About />}
      </div>
    </div>
  );
}

export const WelcomeLoader = async () => { 
  return await apiGetMachines()
}

export default WelcomePage