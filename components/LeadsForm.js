import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import Calendar from 'react-calendar';
import Axios from 'axios';

// AXIOS INSTANCE
const axios = Axios.create({
  baseURL: `${process.env.BASE_URI}/service`,
});

const LeadsForm = () => {
  const totalSteps = 9;
  const [questions, setQuestions] = useState('');
  const [step, setstep] = useState(0);
  const [inputValue, setInputValue] = useState(' ');
  const [displayError, setDisplayError] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState('Please fill in required fields');
  const postDataUsingAxios = () => {
    axios
      .post('/', {
        project_name: 'TEST',
        email: 'TEST',
      })
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const string = e.target ? e.target.value : e;
    if (string.match(/[a-zA-Z0-9]+/)) {
      setInputValue(string);
      setDisplayError(false);
      return false;
    }
    setErrorMsg('Please fill in required fields');
    setInputValue(' ');
    setDisplayError(true);
    return true;
  };
  const plus = useCallback(() => {
    postDataUsingAxios();

    if (step === 0) {
      setstep((prev) => prev + 1);
    } else {
      const error = handleInputChange(inputValue);
      if (!error) {
        setInputValue('');
        setQuestions({
          ...questions,
          [`question${step.toString()}`]: inputValue,
        });
        setstep(() => step + 1);
        if (errorMsg) {
          setErrorMsg('');
        }
      }
    }
  }, [displayError, step]);

  const minus = useCallback(() => {
    if (step > 0) {
      setInputValue(' ');
      // DECREMENT STEP
      setstep(step - 1);

      setDisplayError(false);
    }
  }, [questions]);

  const ErrorEle = useCallback(
    ({ index = undefined }) => (
      <div className="errorEle">
        <h4>{index === undefined ? errorMsg : errorMsg[index]}</h4>
      </div>
    ),
    [errorMsg],
  );

  const KeepingUpWithStep = useCallback(({ selected }) => {
    const calculateLinePercentage = () => (
      selected === 0 ? 0 : ((selected - 1) / (totalSteps - 1)) * 100
    );

    const percentageOfBlueLine = Number.isInteger(selected)
      ? calculateLinePercentage()
      : '';

    return (
      <div
        className="keepingUpLine"
        style={{
          background: `linear-gradient(to right, var(--mpa-navy), var(--mpa-navy) ${percentageOfBlueLine}%, #b9515d ${percentageOfBlueLine}%)`,
        }}
      >
        <div className="keepingUpItemContainer">
          {[
            ...(() => {
              const range = [];
              for (let i = 0; i < totalSteps; i += 1) range.push(i + 1);
              return range;
            })(),
          ].map((index) => (
            <span
              key={index}
              className={`${'keepingUpStep'} ${
                selected >= index ? 'selectedStep' : ''
              }`}
            >
              {index}
            </span>
          ))}
        </div>
      </div>
    );
  }, []);

  const Buttons = useCallback(
    ({
      left, right, marginTop, customPlusFunction,
    }) => (
      <div className="service_buttons">
        {left ? (
          <button
            type="button"
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
            type="button"
            onClick={() => {
              if (!customPlusFunction) plus();
              else customPlusFunction();
            }}
            style={marginTop ? { marginTop } : {}}
          >
            <span>&#8594;</span>
          </button>
        ) : null}
      </div>
    ),
    [plus, minus],
  );

  const QuestionContainer = useCallback(
    ({
      children, left, right, marginBottom, customPlusFunction,
    }) => (
      <div className="service_container">
        <div className="questions">
          {children}
          <Buttons
            left={left}
            right={right}
            marginTop={marginBottom}
            customPlusFunction={customPlusFunction}
          />
          <KeepingUpWithStep selected={step - 1} />
        </div>
      </div>
    ),
    [Buttons, step],
  );
  const CustomSelectTag = ({
    options,
    setSelected,
    selected,
    optionsShowByDefault = false,
  }) => {
    const [dropDown, setDropDown] = useState(optionsShowByDefault);
    const updatedOptions = useMemo(
      () => ['...select an option', ...options],
      [options],
    );

    useEffect(() => {
      setSelected(0);
    }, []);

    const getRootVariable = (str) => parseInt(
      window.getComputedStyle(document.body).getPropertyValue(`--${str}`),
    );

    const maximumOptionHeight = getRootVariable('maximumOptionPerScrollable');
    const optionHeight = getRootVariable('optionHeight');

    useEffect(() => {
      function closeDropDown(e) {
        if (e.target.className.indexOf('option-item') === -1 && dropDown) {
          setDropDown(false);
        }
      }
      window.addEventListener('click', closeDropDown);
      return () => window.removeEventListener('click', closeDropDown);
    }, [dropDown]);

    return (
      <div
        className={`customSelectTag ${dropDown ? 'select-border-bottom' : ''}`}
      >
        <div
          className={`selectDisplay ${dropDown ? 'select-border-bottom' : ''}`}
        >
          <span>{updatedOptions[selected]}</span>
          <i
            className={`${'fa angle-icon fa-angle-down '} ${
              dropDown ? 'up' : 'down'
            }`}
            aria-hidden="true"
            onClick={() => setDropDown((prev) => !prev)}
            key={dropDown}
          />
        </div>
        <div
          key="dropdown"
          className={`optionsContainer ${dropDown ? '' : 'hideDropDown'}`}
          style={{
            bottom: `${
              (updatedOptions.length < maximumOptionHeight
                ? updatedOptions.length * optionHeight
                : maximumOptionHeight * optionHeight) * -1
            }rem`,
          }}
        >
          {updatedOptions.map((option, index) => (
            <div
              key={index}
              className={`option-item ${
                selected === index ? 'selected-option-item' : ''
              }`}
              onClick={() => {
                setSelected(index);
                setDropDown(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CustomCheckboxMaker = ({
    checkboxes,
    setCheckboxes,
    checkBoxLabels,
  }) => {
    useEffect(() => {
      setCheckboxes([
        ...(function () {
          const arr = [];
          for (let i = 0; i < checkBoxLabels.length; i++) {
            const obj = { label: checkBoxLabels[i], checked: false };
            arr.push(obj);
          }
          return arr;
        }()),
      ]);
    }, []);

    return (
      <div className="checkboxWrapper">
        {checkboxes.map((checkbox, index) => (
          <div className="row" key={index}>
            <div
              className="checkbox"
              onClick={() => {
                setCheckboxes((prev) => {
                  const prevObj = [...prev];
                  prevObj[index].checked = !prevObj[index].checked;
                  return prevObj;
                });
              }}
            >
              <i
                className={
                  'fa fa-check '
                  + `${checkbox.checked ? 'checkVisible' : 'checkInvisible'}`
                }
                aria-hidden="true"
              />
            </div>
            <div className="row-label">{checkbox.label}</div>
          </div>
        ))}
      </div>
    );
  };
  const setCustomTagError = (
    prev,
    lengthOfPageQuestions,
    questionIndex,
    errorStr,
  ) => {
    let errorList = [];
    if (prev instanceof Array) {
      errorList = [...prev];
    } else {
      for (let i = 0; i < lengthOfPageQuestions; i += 1) {
        errorList.push('');
      }
    }
    errorList[questionIndex] = errorStr;

    return errorList;
  };
  const validateSelection = (
    options,
    index,
    question,
    questionIndex,
    lengthOfPageQuestions,
  ) => {
    if (!index) {
      setErrorMsg((prev) => setCustomTagError(
        prev,
        lengthOfPageQuestions,
        questionIndex,
        'You must select at least one option.',
      ));
      setDisplayError(true);
    } else {
      return [question, options[index - 1]];
    }
  };
  const validateCheckBox = (
    checkboxes,
    question,
    questionIndex,
    lengthOfPageQuestions,
  ) => {
    const checkedCheckboxes = checkboxes
      .filter((checkbox) => {
        if (checkbox.checked) {
          return true;
        }
        return false;
      })
      .map((checkbox) => checkbox.label);

    if (checkedCheckboxes.length === 0) {
      setErrorMsg((prev) => setCustomTagError(
        prev,
        lengthOfPageQuestions,
        questionIndex,
        'You must check at least one checkbox.',
      ));
    } else {
      return [question, checkedCheckboxes];
    }
  };
  const Page1 = function () {
    return (
      <div className="service_container" id="title">
        <div className="service_icon">
          <span>
            <img src="/assets/images/Idea_icon.png" />
          </span>
        </div>
        <div className="service_block">
          <h1>Want to hire us for your project?</h1>
          <h5>
            Get The world's leading team of builders to develop your product
            with our transparent task-based escrow system
          </h5>
          <button
            type="button"
            onClick={() => {
              plus();
            }}
          >
            TELL US ABOUT YOUR IDEA
          </button>
          <br />
        </div>
      </div>
    );
  };
  const Page2 = useCallback(
    ({ inputValue = '' }) => (
      <QuestionContainer right>
        <div className="service_sub">
          <h2 id="nomarg">Tell us about your idea</h2>
        </div>
        <label htmlFor="idea">
          <p>Project Name</p>
        </label>
        <input
          type="text"
          name="idea"
          className={`${'service_input'} ${
            displayError === undefined ? '' : displayError ? 'error' : 'success'
          }`}
          defaultValue={inputValue}
          placeholder="Enter the title of this product."
          onChange={(e) => handleInputChange(e)}
          autoFocus
        />
        {displayError === true ? <ErrorEle /> : null}
      </QuestionContainer>
    ),
    [displayError, QuestionContainer],
  );
  const Page3 = useCallback(() => {
    const [selected, setSelected] = useState();
    const options = [
      'Business services',
      'Creative industries',
      'Entertainment, Food or Events',
      'Financial services',
      'Health & fitness',
      'Home services',
      'Retail /consumer goods',
      'Texhnology / software',
      'other',
    ];
    const checkBoxLabels = [
      'Deployed Product',
      'UI/UX',
      'Front End',
      'Back End',
      'Product Strategy',
      'Blockchain',
    ];
    const lenght_of_questions = 2;
    const question1 = 'What industry will this project operate in?';
    const question2 = 'Tag your project based on type of work needed.';
    const [checkboxes, changeCheckboxValue] = useState([]);
    const currentQuestionIndex = 0;
    function customPlusFunction() {
      const questionSheetOne = validateSelection(
        options,
        selected,
        question1,
        currentQuestionIndex,
        lenght_of_questions,
      );
      const questionSheetTwo = validateCheckBox(
        checkboxes,
        question2,
        currentQuestionIndex + 1,
        lenght_of_questions,
      );
      if (questionSheetOne && questionSheetTwo) {
        setstep((prev) => prev + 1);
        setQuestions({
          ...questions,
          [`question${step.toString()}`]: [questionSheetOne, questionSheetTwo],
        });
      }
    }

    return (
      <QuestionContainer
        left
        right
        marginBottom="2rem"
        customPlusFunction={customPlusFunction}
      >
        <label htmlFor="industry" className="questionOption">
          {question1}
        </label>
        <CustomSelectTag
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
        {displayError === true && errorMsg[0] !== '' ? (
          <ErrorEle index={0} />
        ) : null}

        <label
          htmlFor="projectType"
          className="questionOption"
          style={{ marginTop: '40px' }}
        >
          {question2}
        </label>
        <CustomCheckboxMaker
          checkBoxLabels={checkBoxLabels}
          checkboxes={checkboxes}
          setCheckboxes={changeCheckboxValue}
        />
        {displayError === true && errorMsg[1] !== '' ? (
          <ErrorEle index={1} />
        ) : null}
      </QuestionContainer>
    );
  }, [displayError, QuestionContainer]);
  const Page4 = function () {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Funding ask</p>
            <p>
              {step}
              /7
            </p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="number"
            min="0"
            max="10000"
            placeholder="How much will cost to fund this project?"
            className="service_input"
            value={inputValue === ' ' ? '' : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };

  const Page5 = function () {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Project details</p>
            <p>
              {step}
              /7
            </p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="text"
            placeholder="Tell us a little bit of this project?"
            className="service_input"
            value={inputValue === ' ' ? '' : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };
  const Page6 = function () {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Size of team</p>
            <p>
              {step}
              /7
            </p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="number"
            min="0"
            max="100"
            placeholder="How many people will be working on this project?"
            className="service_input"
            value={inputValue === ' ' ? '' : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };
  const Page7 = function () {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Launch date</p>
            <p>
              {step}
              /7
            </p>
          </label>
          {displayError === true ? errorEle() : null}
          <Calendar
            className="questions_calendar"
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };
  const Page8 = function () {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Contact details</p>
            <p>
              {step}
              /7
            </p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="email"
            placeholder="What's your email address?"
            className="service_input"
            value={inputValue === ' ' ? '' : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <div className="service_page8Btns">
            <button type="button" id="leftsubmitBtn" onClick={() => minus()}>
              <span>&#8592;</span>
            </button>
            <button type="button" id="submitBtn" onClick={() => plus()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  const Page9 = function () {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">Thank you for submitting your idea!</h2>
            <button type="button" className="service_leftbutton" onClick={() => plus()}>
              Submit another idea
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="service tw-mt-12" key="rigid">
      {step === 0 && <Page1 />}
      {step === 1 && (
        <Page2
          inputValue={
            inputValue !== ' '
              ? inputValue
              : questions.question1
                ? questions.question1
                : ''
          }
        />
      )}
      {step === 2 && <Page3 />}
      {step === 3 && <Page4 />}
      {step === 4 && <Page5 />}
      {step === 5 && <Page6 />}
      {step === 6 && <Page7 />}
      {step === 7 && <Page8 />}
      {step === 8 && <Page9 />}
    </div>
  );
};

export default LeadsForm;
