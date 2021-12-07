import { useEffect, useState, Fragment } from 'react';
import Wireframe1 from './wireframes/wireframe1';
// import Card from "../login-signup/card";
import LoginPage from './helperFiles/login-page';
import Page1 from './steps/step1';
import Page2 from './steps/step2';
import Page3 from './steps/step3';
import Page4 from './steps/step4';
import Page5 from './steps/step5';
import Page6 from './steps/step6';
import Page7 from './steps/step7';
import Page8 from './steps/step8';
import Page9 from './steps/step9';
import Page10 from './steps/step10';
import Page11 from './steps/step11';

const localStorageConsultancyKey = 'consultancy-questions';
const localStorageStepKey = 'consultancy-step';
const Consultancy = function ({
  data, active, clickRegister, setClickRegister,
}) {
  const [step, setstep] = useState(0);
  const [questions, setQuestions] = useState({});
  console.log(questions);

  useEffect(() => {
    if (data === null) {
      setClickRegister(true);
    }
  }, [data]);

  function getLocalVariables(key, wrapFxn, defaultValue) {
    const hasKey = window.localStorage.getItem(key);
    console.log(hasKey);
    if (hasKey) {
      return wrapFxn(hasKey);
    }
    return defaultValue;
  }

  useEffect(() => {
    setQuestions((prev) => getLocalVariables(
      localStorageConsultancyKey,
      (value) => {
        console.log(value);
        return JSON.parse(JSON.parse(JSON.stringify(value)));
      },
      prev,
    ));
    if (data === null) {
      setClickRegister(true);
    } else {
      setstep((prev) => getLocalVariables(
        localStorageStepKey,
        (value) => parseInt(value),
        prev,
      ));
    }
  }, []);
  useEffect(() => {
    const lenght_of_questions = Object.values(questions).length;
    if (lenght_of_questions > 0 && lenght_of_questions + 1 >= step) {
      window.localStorage.setItem(
        localStorageConsultancyKey,
        JSON.stringify(questions),
      );
    }
  }, [questions, step]);
  useEffect(() => {
    if (step > 0) {
      window.localStorage.setItem(localStorageStepKey, parseInt(step));
    }
  }, [step]);

  return (
    <>
      <div className="service tw-mt-12" key="rigid">
        {step == 0 && (
          <Page1
            setstep={setstep}
            data={data}
            setClickRegister={setClickRegister}
          />
        )}
        {step == 1 && (
          <Page2
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 2 && (
          <Page3
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 3 && (
          <Page4
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 4 && (
          <Page5
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}

        {step == 5 && (
          <Page7
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 6 && (
          <Page8
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 7 && (
          <Page9
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 8 && (
          <Page6
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {step == 9 && (
          <Page10
            setstep={setstep}
            step={step}
            questions={questions}
            setQuestions={setQuestions}
            data={data}
          />
        )}
        {step == 10 && (
          <Page11
            step={step}
            localStorageConsultancyKey={localStorageConsultancyKey}
            localStorageStepKey={localStorageStepKey}
            setstep={setstep}
            setQuestions={setQuestions}
          />
        )}
        {/* <Wireframe1 step={100} /> */}
      </div>

      <LoginPage
        clickRegister={clickRegister}
        setClickRegister={setClickRegister}
      />
    </>
  );
};
export default Consultancy;
