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
const getStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_NAME))
}

const updateStorage = (storage) => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(storage))
}
const initMachineStorage = (machineUrl) => { 
  let storage = getStorage()
  const id = getMachineId(machineUrl)

  let progress = {}
  progress["url"] = machineUrl
  progress["collectedList"] = {}
  progress["tokensSpent"] = 0
  storage[id] = progress

  updateStorage(storage)
  return id
}

const getMachineProgress = (machineId) => { 
  return getStorage()[machineId]
}

const getMachineUrl = (machineId) => { 
  return getStorage()[machineId]["url"]
}

const updateMachineProgress = (machineId, data) => { 
  let storage = getStorage()
  storage[machineId] = data
  updateStorage(storage)
}

const getFromDB = async (url, sub) => { 
  let response = await fetch(`${url}${sub}`)
  const data = await response.json()
  return data
}

// Server Functions
const ServerCreateMachine = async ({machineUrl}) => {
  let id = initMachineStorage(machineUrl)
  return id
}

const ServerRetrieveProgress = async ({machineId: id}) => { 
  const url = getMachineUrl(id)
  const machine = await getFromDB(url, "machine.json")
  machine["id"] = id

  const DBItems = await getFromDB(url, "itemList.json")
  machine["totalCount"] = Object.keys(DBItems).length

  let progress = getMachineProgress(id)

  return {
    userMachine: {
      machine: machine, 
      collectedList: progress.collectedList
    },
    machineUrl: url
  }
}

const ServerGetMachineList = async () => {
  let storage = getStorage() 
  if (!storage) {
    storage = {}
    updateStorage(storage)
  }

  return Object.entries(storage).reduce(async (acc, [id, value]) => { 
    let itemList = await getFromDB(value.url, "itemList.json")
    let machine = await getFromDB(value.url, "machine.json")
    acc.push({ id: id, name: machine.name, itemsCollected: Object.keys(value.collectedList).length, totalItems: Object.keys(itemList).length })
    return acc
  }, [])
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

export const mockFetch = (requestType, {body}, serverCtx = null) => { 
  switch (requestType) {
    case "CREATE": return new Promise((resolve) => resolve(ServerCreateMachine(body)))
    case "MACHINES": return new Promise((resolve) => resolve(ServerGetMachineList()))
    case "RETRIEVE": return new Promise((resolve) => resolve(ServerRetrieveProgress(body)))
    case "SPEND": return new Promise((resolve) => resolve(ServerSpendToken(serverCtx)))
    case "LIST": return new Promise((resolve) => resolve(ServerGetCollectionItems(serverCtx)))
    default: return null
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