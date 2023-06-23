// A collection of HTTP requests sent to the backend server
import { mockFetch } from './context/MockServerContext'

export const apiGetMachines = () => {
  return mockFetch("MACHINES", {}).then((result) => { 
    return result
  })
}

export const apiCreateMachine = (machineUrl) => {
  const params = {
    body: {
      machineUrl
    }
  }
  return mockFetch("CREATE", params)
}

export const apiRetrieveProgress = (machineId) => {
  const params = {
    body: {
      machineId
    }
  }
  return mockFetch("RETRIEVE", params)
}

export const apiSpendToken = (serverCtx) => {
  return mockFetch("SPEND", {}, serverCtx)
}

export const apiGetCollection = (serverCtx) => {
  return mockFetch("LIST", {}, serverCtx)
}