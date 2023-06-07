import { createContext, useState } from 'react'

export const WindowContext = createContext({
  isOpen: false,
  openWindow: () => { },
  closeWindow: () => { }
})

export const WindowContextProvider = (props) => { 
  const [windowContent, updateWindowContent] = useState(null)
  const closeWindow = () => updateWindowContent(null)
  return <WindowContext.Provider value={{
    windowContent,
    updateWindowContent,
    closeWindow
  }}>
    {props.children}
  </WindowContext.Provider> 
}

export default WindowContext;