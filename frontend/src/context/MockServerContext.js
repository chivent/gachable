// A temporary file to be replaced with Elixir Server later on...
// For now, we'll be storing user's progress within firebase as well. 

// We'll also be assuming only happy path in this mock.

// TODO: 
// Fix the item being returned from spendToken
// Do all API calls to firebase
// Make a simple clicker game
// Then do all designs and replace 
// Maybe reskin for anniv
// Just host it as a react application on firebase first 

import {createContext, useState} from "react"
const ServerRetrieveProgress = (context, machineId) => { 
  //fetch request to firebase
  // manipulate to return what is needed
    // MockServer values should be updated.
  const machine = {
    id: "AAA",
    name: "Gacha Machine Aaa",
    totalCount: 5
  }
  const userMachine = {
    machine: machine, 
    collectedList: [
      {
        id: "object_1",
        name: "Object 1",
        description: "This is a mock object",
        image: "http://placekitten.com/300/300"
      },
      {
        id: "object_2",
        name: "Object 2",
        description: "This is a mock object",
        image: "http://placekitten.com/300/300"
      }
    ]
  }

  return userMachine
}

const ServerSpendToken = (machineId, userId) => {
  const myArray = new Uint32Array(10);
  return {
    item: {
      id: crypto.getRandomValues(myArray),
      name: "Object 3",
      description: "This is a mock object",
      image: "http://placekitten.com/300/300"
    }
  }
}

const fetch = (requestType, {body}) => { 
  switch (requestType) {
    case "SPEND": return new Promise((resolve) => resolve(ServerSpendToken(body.serverCtx, body.userId)))
    case "RETRIEVE": return new Promise((resolve) => resolve(ServerRetrieveProgress(body.ctx, body.userId, body.machineId)))
  }
}

const MockServerContext = createContext({
  itemIds: [],
  updateItemIds: () => { },
  fetch: fetch
})

export const MockServerContextProvider = (props) => {
  const [itemIds, updateItemIds] = useState([])
  return <MockServerContext.Provider value={{itemIds, updateItemIds, fetch}}>{ props.children }</MockServerContext.Provider>
}

export default MockServerContext;