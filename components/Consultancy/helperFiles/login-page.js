import { Fragment } from "react";
import Card from "../../login-signup/card";

function LoginPage({ setClickRegister, clickRegister }) {
  return (
    <Fragment>
      {clickRegister ? (
        <div className="create_event">
          <div
            className="create_event-shadow"
            onClick={() => {
              setClickRegister(false);
            }}
          ></div>
          <div id="create_event-container" className="create_event-container">
            <Card setClickRegister={setClickRegister}/>
          </div>
          <i
            className="close_icon fas fa-times close-icon"
            onClick={() => {
              setClickRegister(false);
            }}
          ></i>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default LoginPage;
