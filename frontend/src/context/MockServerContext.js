// A temporary file to be replaced with Elixir Server later on...
import { useState, createContext} from 'react'
const STORAGE_NAME = "gachable-progress"

// Utils
const randomItem = (ids) => { 
  const rand = Math.floor(Math.random() * (Object.keys(ids).length));
  return ids[rand]
}

const getMachineId = (url) => { 
  return hashCode(url)
}

const hashCode = (url) => {
  var result, i, char = 0;
  if (url.length === 0) return result;
  for (i = 0; i < url.length; i++) {
    char = url.charCodeAt(i);
    result = ((result << 5) - result) + char;
    result |= 0; // Convert to 32bit integer
  }
  return result;
}

// Mock Database Accessors
const getUser = () => {
  return JSON.parse(localStorage.getItem(STORAGE_NAME))
}

const getMachineProgress = (machineId) => { 
  let gachableStorage = JSON.parse(localStorage.getItem(STORAGE_NAME))
  if (!gachableStorage) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify({}))
    return {}
  }
  return gachableStorage[machineId]
}

const updateMachineProgress = (machineId, data) => { 
  let user = getUser()
  user[machineId] = data
  localStorage.setItem(STORAGE_NAME, JSON.stringify(user))
}

const getFromDB = async (url, sub) => { 
  let response = await fetch(`${url}${sub}`)
  const data = await response.json()
  return data
}

// Server Functions
const ServerRetrieveProgress = async ({machineUrl: url}) => { 
  const id = getMachineId(url)
  const machine = await getFromDB(url, "machine.json")
  machine["id"] = id

  const DBItems = await getFromDB(url, "itemList.json")
  machine["totalCount"] = Object.keys(DBItems).length

  // Generate progress if does not exist yet...
  let progress = getMachineProgress(id)
  if (!progress) {
    progress = {}
    progress["collectedList"] = {}
    progress["tokensSpent"] = 0
    updateMachineProgress(id, progress)
  }

  return {
    userMachine: {
      machine: machine, 
      collectedList: progress.collectedList
    },
    machineUrl: url
  }
}

const ServerGetCollectionItems = async ({machineId, machineUrl}) => { 
  const DBItems = await getFromDB(machineUrl, "itemList.json")
  let collection = {}
  let progress = getMachineProgress(machineId)
  await Object.entries(progress.collectedList).forEach(([key, value]) => {
      let item = DBItems[key]
      item.amount = value
      collection[key] = item
  })
  return collection
}

const ServerSpendToken = async ({machineId, machineUrl}) => {
  const DBItems = await getFromDB(machineUrl, "itemList.json")
  let itemId = randomItem(Object.keys(DBItems))
  let returnedItem = DBItems[itemId]

  let progress = getMachineProgress(machineId)
  if (itemId in progress.collectedList) {
    progress.collectedList[itemId]++
  } else { 
    progress.collectedList[itemId] = 1
  }
  let amount = progress.collectedList[itemId]
  progress.tokensSpent += 1
  updateMachineProgress(machineId, progress)
  
  return [{id: itemId, amount: amount}, returnedItem]
}

export const mockFetch = (serverCtx = null, requestType, {body}) => { 
  switch (requestType) {
    case "RETRIEVE": return new Promise((resolve) => resolve(ServerRetrieveProgress(body)))
    case "SPEND": return new Promise((resolve) => resolve(ServerSpendToken(serverCtx)))
    case "LIST": return new Promise((resolve) => resolve(ServerGetCollectionItems(serverCtx)))
  }
}

const MockServerContext = createContext({
  initDB: () => { },
  machineUrl: "",
  machineId: ""
})

export const MockServerContextProvider = (props) => {
  const [machineUrl, updateUrl] = useState([])
  const [machineId, updateId] = useState([])

  const initDB = (url, id) => { 
    updateUrl(url)
    updateId(id)
  }
  
  return <MockServerContext.Provider value={{ machineUrl, machineId, initDB }}>
    {props.children}
  </MockServerContext.Provider>
}

export default MockServerContext;