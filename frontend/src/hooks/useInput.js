import {useReducer} from 'react'

const useInput = (validate) => { 
  const updateInput = (prevState, { action, value }) => { 
    switch (action) { 
      case "ON_BLUR": return prevState.touched ? prevState : {errorMsg: validate(value), touched: true, value: value}
      case "VALIDATE": return { ...prevState, value: value, errorMsg: validate(value) }
      default: return { ...prevState, value: value }
    }
  }
  const [input, dispatchUpdate] = useReducer(updateInput, { touched: false, value: "", errorMsg: null })
  return {
    input: input,
    dispatch: dispatchUpdate
  }
}

export default useInput;

