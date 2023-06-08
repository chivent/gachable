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

  const initMachine = ({ machine, collectedList }) => { 
    updateMachine(machine)
    listHandler(collectedList)
  }

  const spendToken = async (serverCtx) => { 
    let item = null;
    await apiSpendToken(serverCtx).then(([id, newItem]) => {
      // Only place in if item is not a duplicate
      listHandler((prevState) => {
        prevState[id] = newItem
        return prevState;
      })
      item = newItem
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