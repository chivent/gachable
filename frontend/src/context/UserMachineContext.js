import {useState, createContext} from 'react'

const UserMachineContext = createContext({
  machine: {},
  collectedList: [],
  tokens: 0,
  initMachine: () => { },
  updateCollectedList: () => { },
  addToken: () => { }
})

export const UserMachineContextProvider = (props) => {
  const [machine, updateMachine] = useState({})
  const [collectedList, listHandler] = useState([])
  const [tokens, tokenHandler] = useState(0)

  const initMachine = (newMachine, tokens, collectedList) => { 
    updateMachine(newMachine)
    tokenHandler(tokens)
    listHandler(collectedList)
  }

  const updateCollectedList = (newItem) => { 
    listHandler((prevState) => { 
      return [newItem, ...prevState]
    })
  }
  
  const addToken = () => { 
    tokenHandler((prevState) => { return prevState++})
  }
  
  return <UserMachineContext.Provider value={{
    tokens: tokens,
    machine: machine,
    collectedList: collectedList,
    initMachine: initMachine,
    updateCollectedList: updateCollectedList,
    addToken: addToken
  }}>
    {props.children}
  </UserMachineContext.Provider>
}

export default UserMachineContext