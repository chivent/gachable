import { useState, createContext } from 'react'
import {apiSpendToken} from '../ApiRequests.js'

const UserMachineContext = createContext({
  machine: {},
  collectedList: [],
  initMachine: () => { },
  spendToken: () => { }
})

export const UserMachineContextProvider = (props) => {
  const [machine, updateMachine] = useState({})
  const [collectedList, listHandler] = useState([])

  const initMachine = (newMachine, collectedList) => { 
    updateMachine(newMachine)
    listHandler(collectedList)
  }

  const spendToken = async (serverCtx) => { 
    let item = null;
    await apiSpendToken(serverCtx).then((response) => {
      // Only place in if item is not a duplicate
      listHandler([...collectedList, response.item])
      item = response.item
    })
    return item
  }
  
  return <UserMachineContext.Provider value={{
    machine: machine,
    collectedList: collectedList,
    initMachine: initMachine,
    spendToken: spendToken
  }}>
    {props.children}
  </UserMachineContext.Provider>
}

export default UserMachineContext