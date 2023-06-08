// A collection of HTTP requests sent to the backend server

export const apiRetrieveProgress = (serverCtx, userId, machineId) => {
  // Overlay progress-loader while waiting
  const params = {
    body: {
      serverCtx,
      userId,
      machineId
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
      machineId,
      userId
    }
  }
  return serverCtx.fetch("SPEND", params)
}