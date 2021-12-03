import { useState, Fragment } from "react";
import BlurBackground from "../helperFiles/blurBackground";
import Select from "../helperFiles/customInputTags/select";
import NeedHelp from "../helperFiles/needHelp";
import OverlayCard from "../helperFiles/overlayCard";
import QuestionContainer from "../helperFiles/questionContainer";
function Wireframe1({ step }) {
  const [showBlur, setShowBlur] = useState(0);
  let projectId = "XXALD4";
  const option = 2;
  const [selected, setSelected] = useState(undefined);
  const options = [
    "5 days",
    "6 days",
    "7 days",
    "8 days",
    "9 days",
    "10 days",
    "11 days",
    "12 days",
    "no deadline",
  ];
  return (
    <Fragment>
      <QuestionContainer step={step} id="wireframe1">
        <div className="body">
          <div className="inner-body">
            <header>
              Your project ID is <span>{projectId}</span>
            </header>
            <article>
              Due to heavy traffic of projects, no MPA project manager could
              claim your project. You could remind PM’s to claim your project by
              pressing the follow up button.
            </article>
            <button
              onClick={() => {
                setShowBlur(option);
              }}
            >
              Follow Up
            </button>
          </div>
          <div className="bkgCircle"></div>
          <div className="bkgCircle-onTop">
            <img src="/assets/images/icons/Group 1758.png" alt="sad-emoji" />
          </div>
        </div>
      </QuestionContainer>
      {showBlur ? (
        <BlurBackground>
          <OverlayCard>
            <Fragment>
              {" "}
              <div style={{ textAlign: "center" }}>
                {showBlur === 1
                  ? "You can Follow Up only once in a day!"
                  : "A reminder notification has been send to Project Managers to claim your project. You could select a deadline for PM’s to claim your project before you get a full refund on your project quote fees."}
              </div>
              <div className="contain-buttons">
                {showBlur === 1 ? (
                  <button
                    className="btn-1"
                    onClick={() => {
                      document.body.classList.remove("hide-overflow");
                      setShowBlur(0);
                    }}
                  >
                    Okay
                  </button>
                ) : (
                  <div style={{ width: "60%", display: "flex" }}>
                    <button
                      className="btn-1 btn-1-plus-select"
                      style={{
                        margin: 0,
                      }}
                      onClick={() => {
                        if (selected) {
                          document.body.classList.remove("hide-overflow");
                          setShowBlur(0);
                        }
                      }}
                    >
                      Send Deadline
                    </button>
                    <div
                      style={{
                        width: "30%",
                        display: "inline-block",
                      }}
                    >
                      <Select
                        options={options}
                        selected={selected}
                        setSelected={setSelected}
                        questionStr={"Enter a followup deadline"}
                        turnOffLeftBorder
                        defaultStr="..."
                        colorScheme={{
                          mainColor: "var(--mpa-pink)",
                          hoverColor: "#ff00b73b",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          </OverlayCard>
        </BlurBackground>
      ) : null}
      <NeedHelp />
    </Fragment>
  );
}
export default Wireframe1;
