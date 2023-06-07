import classes from "../UI/FormInput.module.css"

const FormInput = ({label, type, input, dispatch}) => { 
  const blurUrlInput = (e) => { dispatch({ action: "ON_BLUR", value: e.target.value }) }
  const changeUrlInput = (e) => {
    const action = input.touched ? "VALIDATE" : null
    dispatch({ action: action, value: e.target.value })
  }

  return <div className={classes.formField}>
    <label> {label} </label>
    <input type={type} value={input.value} onBlur={blurUrlInput} onChange={changeUrlInput} />
    <p className={classes.errorMessage}>{input.errorMsg}</p>
  </div>
}

export default FormInput;