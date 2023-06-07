import {useState, createContext} from 'react'

const UserMachineContext = createContext({
  machine: {},
  collectedList: [],
  tokens: 0,
  initMachine: () => { },
  spendToken: () => { },
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
  
  const addToken = () => { 
    // Just do on react for now
    tokenHandler((prevState) => { return prevState++})
  }

  const spendToken = () => { 
    // TOOD: Send request -> update tokens, list
    //     listHandler((prevState) => { 
    //   return [newItem, ...prevState]
    // })
    // Renew token: tokenHandler(newTokens)
    // Add to list: [...collected, newItem]
  }
  
  return <UserMachineContext.Provider value={{
    tokens: tokens,
    machine: machine,
    collectedList: collectedList,
    initMachine: initMachine,
    spendToken: spendToken,
    addToken: addToken
  }}>
    {props.children}
  </UserMachineContext.Provider>
}

export default UserMachineContext