// A collection of HTTP requests sent to the backend server
import { mockFetch } from './context/MockServerContext'

export const apiRetrieveProgress = (machineUrl) => {
  // TODO: Add UserID?
  const params = {
    body: {
      machineUrl
    }
  }
  return mockFetch(null, "RETRIEVE", params)
}

export const apiSpendToken = (serverCtx) => {
  return mockFetch(serverCtx, "SPEND", {})
}

export const apiGetCollection = (serverCtx) => {
  return mockFetch(serverCtx, "LIST", {})
}