import { Fragment } from "react";

const dummyFunction = () => {};
function Buttons({
  left,
  right,
  marginTop,
  plus = dummyFunction,
  minus = dummyFunction,
  customPlusText,
}) {
  return (
    <div className="service_buttons">
      {left ? (
        <button
          onClick={() => {
            minus();
          }}
          style={marginTop ? { marginTop } : {}}
        >
          <span>&#8592;</span>
        </button>
      ) : null}
      {right ? (
        <button
          onClick={() => {
            plus();
            // if (!customPlusFunction) plus();
            // else customPlusFunction();
          }}
          style={marginTop ? { marginTop } : {}}
        >
          <span>
            {customPlusText ? customPlusText : <Fragment>&#8594;</Fragment>}
          </span>
        </button>
      ) : null}
    </div>
  );
}
export default Buttons;
