import classes from "./Navigation.module.css"
import UIClasses from "../UI/UI.module.css"
import { useState, useEffect } from 'react'
import {PageLayouts} from '../../pages/WelcomePage'

const Navigation = (props) => {
  const [active, updateActive] = useState(props.page)
  const activeClass = `${UIClasses.bgSecondary} ${classes.active} `
  const activeFn = (type) => { 
    return `${classes.link} ${active === type ? activeClass: classes.inactive}`
  }
  const showAbout = () => { props.dispatchContent(PageLayouts.about) }
  const showCreate = () => { props.dispatchContent(PageLayouts.create) }
  const showPlay = () => { props.dispatchContent(PageLayouts.play) }

  useEffect(() => { updateActive(props.page) }, [props.page])

  return <div className={`${UIClasses.textPrimary} ${classes.layout}`}>
    <p className={activeFn(PageLayouts.play)} onClick={showPlay} > PLAY </p>
    <p className={classes.divider}> | </p>
    <p className={activeFn(PageLayouts.create)} onClick={showCreate} > CREATE A MACHINE </p>
    <p className={classes.divider}> | </p>
    <p className={activeFn(PageLayouts.about)} onClick={showAbout} > ABOUT </p>
  </div>
}

export default Navigation