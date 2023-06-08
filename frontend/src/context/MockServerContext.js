// A temporary file to be replaced with Elixir Server later on...
// For now, we'll be storing user's progress within firebase as well. 

// We'll also be assuming only happy path in this mock.

import { createContext, useState } from "react"

// Utils
const randomVal = () => { 
  const myArray = new Uint32Array(10);
  return crypto.getRandomValues(myArray)
}

const randomItem = (ids) => { 
  const rand = Math.floor(Math.random() * (Object.keys(ids).length));
  return ids[rand]
}

// Server Functions
export const ServerRetrieveProgress = async (_userId, _machineURL) => { 
  let response = await fetch("https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/itemList.json")
  const items = await response.json()
  const itemIds = Object.keys(items)

  response = await fetch("https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/machine.json")
  const machine = await response.json()
  machine["id"] = randomVal()
  machine["totalCount"] = itemIds.length

  // Generate user if does not exist yet...
  response = await fetch("https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/user.json")
  let user = await response.json()
  if (!user.collectedList) {
    user["collectedList"] = {}
  }

  const userMachine = {
    machine: machine, 
    collectedList: user.collectedList
  }

  return {userMachine: userMachine, itemIds: itemIds}
}

// const ServerSpendToken = (machineId, userId) => {
//   const myArray = new Uint32Array(10);
//   return {
//     item: {
//       id: crypto.getRandomValues(myArray),
//       name: "Object 3",
//       description: "This is a mock object",
//       image: "http://placekitten.com/300/300"
//     }
//   }
// }

const ServerSpendToken = async (serverCtx, _machineId, _userId) => {
  let itemId = randomItem(serverCtx.itemIds)
  let response = await fetch(`https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/itemList/${itemId}.json`)
  let returnedItem = await response.json()

  // TEMP: Update values in firebase for user
  response = await fetch("https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/user.json")
  let user = await response.json()
  if (!user.collectedList) {
    user["collectedList"] = {}
  }
  user.collectedList[itemId] = returnedItem
  response = await fetch("https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/user.json", { body: JSON.stringify({ collectedList: user.collectedList }), method: "PATCH"})
  
  return [ itemId, returnedItem]
}

const mockFetch = (requestType, {body}) => { 
  switch (requestType) {
    case "SPEND": return new Promise((resolve) => resolve(ServerSpendToken(body.serverCtx, body.userId)))
    case "RETRIEVE": return new Promise((resolve) => resolve(ServerRetrieveProgress(body.ctx, body.userId, body.machineId)))
  }
}

const MockServerContext = createContext({
  itemIds: [],
  updateItemIds: () => { },
  storeInit: () => { },
  fetch: mockFetch
})

export const MockServerContextProvider = (props) => {
  const [itemIds, updateItemIds] = useState([])
  const storeInit = (itemIds) => { 
    updateItemIds(itemIds)
  }
  return <MockServerContext.Provider value={{itemIds, updateItemIds, storeInit, fetch: mockFetch}}>{ props.children }</MockServerContext.Provider>
}

export default MockServerContext;