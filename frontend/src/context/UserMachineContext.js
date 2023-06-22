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
    await apiSpendToken(serverCtx).then(([collected, newItem]) => {
      listHandler((prevState) => {
        prevState[collected.id] = collected
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