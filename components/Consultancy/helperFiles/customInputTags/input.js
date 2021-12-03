import { Fragment } from "react";
import ErrorPrint from "../errorPrint";

//undefined ---> the input was just initialized
//[] ---> the input is incorrect
//string ---> the input is correct

function Input({
  inputValue,
  handleInputChange,
  inputType = "text",
  placeholder = "Please enter text",
  defaultValue,
}) {
  return (
    <Fragment>
      <input
        type={inputType}
        name="idea"
        className={`${"service_input"} ${
          inputValue === undefined
            ? ""
            : inputValue instanceof Array
            ? "error"
            : "success"
        }`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e)}
        autoFocus
      />
      {inputValue instanceof Array ? <ErrorPrint errors={inputValue} /> : null}
    </Fragment>
  );
}
export default Input;
