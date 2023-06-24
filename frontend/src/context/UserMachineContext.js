import { useState, createContext } from 'react'
import {apiSpendToken} from '../ApiRequests.js'

const UserMachineContext = createContext({
  machine: {},
  collectedList: [],
  collectedCount: 0,
  initMachine: () => { },
  spendToken: () => { }
})

export const UserMachineContextProvider = (props) => {
  const [machine, updateMachine] = useState({})
  const [collectedList, listHandler] = useState([])
  const [collectedCount, countHandler] = useState(0)

  const initMachine = ({ machine, collectedList }) => { 
    updateMachine(machine)
    listHandler(collectedList)
    countHandler(Object.keys(collectedList).length)
  }

  const spendToken = async (serverCtx) => { 
    let item = null;
    await apiSpendToken(serverCtx).then(async ([collected, newItem]) => {
      await listHandler((prevState) => {
        prevState[collected.id] = collected
        return prevState;
      })
      countHandler(Object.keys(collectedList).length)
      item = newItem
    })
    return item
  }
  
  return <UserMachineContext.Provider value={{
    machine: machine,
    collectedList: collectedList,
    initMachine: initMachine,
    spendToken: spendToken,
    collectedCount: collectedCount
  }}>
    {props.children}
  </UserMachineContext.Provider>
}

export default UserMachineContext