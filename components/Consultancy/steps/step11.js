import { useEffect } from "react";
import { Fragment } from "react";
import BlurBackground from "../helperFiles/blurBackground";
import NeedHelp from "../helperFiles/needHelp";
import OverlayCard from "../helperFiles/overlayCard";
import QuestionContainer from "../helperFiles/questionContainer";

function Page11({
  step,
  localStorageConsultancyKey,
  localStorageStepKey,
  setstep,
  setQuestions,
}) {
  const paymentReceived = "$XX.00";
  const projectId = "XXALD4";
  const transactionId = "58";
  const date = new Date().toLocaleDateString().replaceAll("/", ".");
  useEffect(() => {
    window.localStorage.removeItem(localStorageStepKey);
    window.localStorage.removeItem(localStorageConsultancyKey);
  }, []);
  return (
    <Fragment>
      <QuestionContainer
        marginBottom="1rem"
        step={step}
        id="page11"
        keepingUpMarginTop={"5rem"}
      >
        <div className="body">
          <div className="wrap-pad">
            <h1>
              <img src="/assets/images/icons/Group 1725.png" />
              Payment Successful!
            </h1>
            <section className="thank-you">
              <span>
                <span className="pink">Thank you!</span> Your payment of{" "}
                {paymentReceived} has been received.
              </span>
            </section>
            <section className="payment-detail">
              Project ID: {projectId} / Transaction ID: #{transactionId} / Date:{" "}
              {date}
            </section>
            <article className="response-info">
              <div>
                {" "}
                Please allow upto <span className="blue">
                  5 business days
                </span>{" "}
                for an MPA project manager to take charge of your project. You
                will be notified and he will be in touch with you.
              </div>
              <a href="/">
                <button
                  style={{
                    marginRight: "2rem",
                    color: "var(--mpa-navy)",
                    background: "white",
                    border: "1px solid var(--mpa-navy)",
                  }}
                >
                  Back to Home
                </button>
              </a>

              <button
                onClick={() => {
                  setstep(0);
                  setQuestions({});
                  window.localStorage.removeItem(localStorageStepKey);
                  window.localStorage.removeItem(localStorageConsultancyKey);
                }}
              >
                New Project Idea!
              </button>
            </article>
          </div>
          <div className="response-time">
            *Project Managers generally take{" "}
            <span className="bold">1-2 weeks</span> to prepare a quote.
          </div>
        </div>
      </QuestionContainer>

      <NeedHelp />
    </Fragment>
  );
}
export default Page11;
