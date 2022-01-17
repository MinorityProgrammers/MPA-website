/* eslint-disable no-useless-escape */
import React, { useRef, useState } from 'react';
import InputWithIcon from '../helperFiles/customInputTags/inputWithIcon';
import ErrorPrint from '../helperFiles/errorPrint';
import useDefaultValue from '../helperFiles/getDefaultValue';
import SelectTemplate from '../helperFiles/templates/selectTemplate';

const Page8 = function ({
  step, setstep, questions, setQuestions,
}) {
  const inputRef = useRef();
  const [errorMsg, setErrorMsg] = useState([]);
  const [messageChanged, setMessageChanged] = useState(0);

  function inputValidation() {
    if (!inputRef.current?.value) {
      setErrorMsg(['An email address must be entered.']);
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        inputRef.current.value,
      )
    ) {
      setErrorMsg(['Email address is invalid!']);
    } else {
      setErrorMsg([]);
    }
  }
  const childRenderInfo = {
    renderWhenOptionIs: 1,
    answerToInput: inputRef.current?.value,
    validateChild: () => errorMsg.length === 0,
    onStart: inputValidation,
    childChanged: messageChanged,
  };

  // get default values
  const defaultValue = useDefaultValue(questions, step, 1);
  console.log(defaultValue);
  return (
    <SelectTemplate
      step={step}
      setstep={setstep}
      questions={questions}
      setQuestions={setQuestions}
      options={[
        'Use the same email as my Sign-In',
        'Use a different email from my Sign-In email',
      ]}
      question1="Please enter your contact email."
      childRenderInfo={childRenderInfo}
    >
      <InputWithIcon
        id="updatedEmailAddress"
        inputRef={inputRef}
        onChange={(e) => {
          setMessageChanged((prev) => prev + 1);
          inputValidation(e);
        }}
        defaultValue={defaultValue || ''}
        label="Please enter your contact email address."
        placeholder="E-mail Address"
        iconLink="/assets/images/icons/Group.svg"
        marginTop
        color="var(--consultancyPageColor)"
        width="100%"
      />
      {errorMsg ? <ErrorPrint errors={errorMsg} /> : null}
    </SelectTemplate>
  );
};
export default Page8;
