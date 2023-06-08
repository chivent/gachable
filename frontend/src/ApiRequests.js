// A collection of HTTP requests sent to the backend server
import {ServerRetrieveProgress} from './context/MockServerContext'

export const apiRetrieveProgress = (serverCtx, userId, machineURL) => {
  const params = {
    body: {
      serverCtx,
      machineURL,
      userId
    }
  }
  return serverCtx.fetch("RETRIEVE", params)
    .then(function (response) {
    return response
  })
}

export const apiSpendToken = (serverCtx, machineId, userId) => {
  // Overlay progress-loader while waiting
  const params = {
    body: {
      serverCtx,
      machineId,
      userId
    }
  }
  return serverCtx.fetch("SPEND", params)
}