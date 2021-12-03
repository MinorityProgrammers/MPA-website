import React, {
  useState,
  useEffect,
  Children,
  useMemo,
  useCallback,
} from "react";
import Calendar from "react-calendar";
import Link from "next/link";
import Axios from "axios";

// AXIOS INSTANCE
const axios = Axios.create({
  baseURL: "https://koinstreet-learn-api.herokuapp.com/api/v1/service",
});

const LeadsForm = () => {
  const totalSteps = 9;
  const [questions, setQuestions] = useState("");

  const [step, setstep] = useState(0);

  const [inputValue, setInputValue] = useState(" ");

  const [displayError, setDisplayError] = useState(undefined);

  const [errorMsg, setErrorMsg] = useState("Please fill in required fields");

  const test = "test post request";

  // axios get request for test
  // const getInfoUsingAxios = () => {
  //   axios.get().then(res => console.log(res.data));
  // }

  const postDataUsingAxios = () => {
    axios
      .post("/", {
        project_name: "TEST",
        email: "TEST",
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    // try {
    //   if (e.target.value.match(/[a-zA-Z0-9]+/)) {
    //     // console.log('LETTERS AND NUMBER');
    //     if (
    //       e.target.value.match(/[0-9]+/) &&
    //       !e.target.value.match(/[a-zA-Z]+/)
    //     ) {
    //       // console.log('JUST NUMBER');
    //       if (step === 5) {
    //         if (e.target.value <= 100 && e.target.value >= 0) {
    //           setInputValue(e.target.value);
    //           setDisplayError(false);
    //           return false;
    //         }
    //       } else if (e.target.value <= 1000000 && e.target.value >= 0) {
    //         setInputValue(e.target.value);
    //         setDisplayError(false);
    //         return false;
    //       }
    //     } else if (e.target.value.match(/[a-zA-Z0-9]+/)) {
    //       // console.log('LETTERS AND NUMBER');
    //       setInputValue(e.target.value);
    //       setDisplayError(false);
    //       return false;
    //     }
    //   } else {
    //     // console.log('NOTHING');
    //     setErrorMsg("Please fill in required fields");
    //     setInputValue(" ");
    //     setDisplayError(true);
    //     return true;
    //   }
    // } catch (error) {
    //   // console.log('ERROR CATCHING');
    //   setErrorMsg("Please fill in required fields");
    //   setInputValue(" ");
    //   setDisplayError(true);
    //   return true;
    // }

    let string = e.target ? e.target.value : e;
    if (string.match(/[a-zA-Z0-9]+/)) {
      setInputValue(string);
      setDisplayError(false);
      return false;
    } else {
      setErrorMsg("Please fill in required fields");
      setInputValue(" ");
      setDisplayError(true);
      return true;
    }
  };
  const plus = useCallback(() => {
    console.log(inputValue);
    postDataUsingAxios();

    if (step === 0) {
      setstep((prev) => prev + 1);
    } else {
      let error = handleInputChange(inputValue);
      console.log(error);
      if (!error) {
        setInputValue("");
        setQuestions({
          ...questions,
          ["question" + step.toString()]: inputValue,
        });
        setstep((prev) => step + 1);
        if (errorMsg) {
          setErrorMsg("");
        }
      }
    }

    //POST DATA USING AXIOS
    // postDataUsingAxios();

    // if (!displayError || step === 0) {
    //   //REMOVE ERROR MSG IS DISPAY IS TRUE
    //   if (displayError === true) setDisplayError(false);

    //   if (step < 9) {
    //     //INCREMENT STEP
    //     setstep(step + 1);

    //     //TAKE INPUT VALUE AND SAVE TO QUESTIONS
    //     if (step > 0) {
    //       if (step === 7) {
    //         if (
    //           inputValue.match(
    //             /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //           )
    //         ) {
    //           setQuestions({
    //             ...questions,
    //             ["question" + step.toString()]: inputValue,
    //           });
    //         } else {
    //           setErrorMsg("Incorrect Format");
    //           setDisplayError(true);
    //           setstep(step);
    //         }
    //       } else {
    //         setQuestions({
    //           ...questions,
    //           ["question" + step.toString()]: inputValue,
    //         });
    //       }
    //     }
    //     //CLEAR INPUT
    //     if (
    //       questions["question" + (step + 1).toString()] === " " ||
    //       questions["question" + (step + 1).toString()] === undefined ||
    //       questions["question" + (step + 1).toString()] === null
    //     )
    //       setInputValue(" ");
    //     else setInputValue(questions["question" + (step + 1).toString()]);
    //   }
    // } else if (displayError) {
    //   if (step === 6) {
    //     setErrorMsg("Please choose a date");
    //   } else {
    //     setErrorMsg("Please fill in required fields");
    //   }

    //   // setDisplayError(true);
    // } else if (step >= 8) {
    //   //CLEAR INPUT VALUE
    //   setInputValue(" ");

    //   //CLEAR QUESTIONS
    //   setQuestions({});

    //   //SET STEP TO 0
    //   setstep(0);
    // }
  }, [displayError, step]);

  const minus = useCallback(() => {
    if (step > 0) {
      setInputValue(" ");
      //DECREMENT STEP
      setstep(step - 1);

      //UPDATE INPUT TO PREVIOUS ENTRY
      // if (
      //   questions["question" + (step - 1).toString()] === undefined ||
      //   questions["question" + (step - 1).toString()] === " " ||
      //   questions["question" + (step - 1).toString()] === null
      // ) {
      //   setInputValue(" ");
      // } else {
      //   setInputValue(questions["question" + (step - 1).toString()]);
      // }

      setDisplayError(false);
    }
  }, [questions]);

  const ErrorEle = useCallback(
    ({ index = undefined }) => {
      return (
        <div className="errorEle">
          <h4>{index === undefined ? errorMsg : errorMsg[index]}</h4>
        </div>
      );
    },
    [errorMsg]
  );

  const KeepingUpWithStep = useCallback(({ selected }) => {
    const calculateLinePercentage = () =>
      selected === 0 ? 0 : ((selected - 1) / (totalSteps - 1)) * 100;

    const percentageOfBlueLine = Number.isInteger(selected)
      ? calculateLinePercentage()
      : "";

    return (
      <div
        className="keepingUpLine"
        style={{
          background: `linear-gradient(to right, var(--mpa-navy), var(--mpa-navy) ${percentageOfBlueLine}%, #b9515d ${percentageOfBlueLine}%)`,
        }}
      >
        <div className="keepingUpItemContainer">
          {[
            ...(function () {
              const range = [];
              for (let i = 0; i < totalSteps; i++) range.push(i + 1);
              return range;
            })(),
          ].map((index) => {
            return (
              <span
                key={index}
                className={`${"keepingUpStep"} ${
                  selected >= index ? "selectedStep" : ""
                }`}
              >
                {index}
              </span>
            );
          })}
        </div>
      </div>
    );
  }, []);

  const Buttons = useCallback(
    ({ left, right, marginTop, customPlusFunction }) => {
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
                if (!customPlusFunction) plus();
                else customPlusFunction();
              }}
              style={marginTop ? { marginTop } : {}}
            >
              <span>&#8594;</span>
            </button>
          ) : null}
        </div>
      );
    },
    [plus, minus]
  );

  const QuestionContainer = useCallback(
    ({ children, left, right, marginBottom, customPlusFunction }) => {
      return (
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
      );
    },
    [Buttons, step]
  );
  const CustomSelectTag = ({
    options,
    setSelected,
    selected,
    optionsShowByDefault = false,
  }) => {
    const [dropDown, setDropDown] = useState(optionsShowByDefault);
    const updatedOptions = useMemo(() => {
      return ["...select an option", ...options];
    }, [options]);

    useEffect(() => {
      setSelected(0);
    }, []);

    const getRootVariable = (str) =>
      parseInt(
        window.getComputedStyle(document.body).getPropertyValue("--" + str)
      );

    const maximumOptionHeight = getRootVariable("maximumOptionPerScrollable");
    const optionHeight = getRootVariable("optionHeight");

    useEffect(() => {
      function closeDropDown(e) {
        if (e.target.className.indexOf("option-item") === -1 && dropDown) {
          setDropDown(false);
        }
      }
      window.addEventListener("click", closeDropDown);
      return () => window.removeEventListener("click", closeDropDown);
    }, [dropDown]);

    return (
      <div
        className={
          "customSelectTag " + (dropDown ? "select-border-bottom" : "")
        }
      >
        <div
          className={
            "selectDisplay " + (dropDown ? "select-border-bottom" : "")
          }
        >
          <span>{updatedOptions[selected]}</span>
          <i
            className={`${"fa angle-icon fa-angle-down "} ${
              dropDown ? "up" : "down"
            }`}
            aria-hidden="true"
            onClick={() => setDropDown((prev) => !prev)}
            key={dropDown}
          ></i>
        </div>
        <div
          key={"dropdown"}
          className={"optionsContainer " + (dropDown ? "" : "hideDropDown")}
          style={{
            bottom: `${
              (updatedOptions.length < maximumOptionHeight
                ? updatedOptions.length * optionHeight
                : maximumOptionHeight * optionHeight) * -1
            }rem`,
          }}
        >
          {updatedOptions.map((option, index) => {
            return (
              <div
                key={index}
                className={`option-item ${
                  selected === index ? "selected-option-item" : ""
                }`}
                onClick={() => {
                  setSelected(index);
                  setDropDown(false);
                }}
              >
                {option}
              </div>
            );
          })}
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
        })(),
      ]);
    }, []);

    return (
      <div className={"checkboxWrapper"}>
        {checkboxes.map((checkbox, index) => {
          return (
            <div className={"row"} key={index}>
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
                    "fa fa-check " +
                    `${checkbox.checked ? "checkVisible" : "checkInvisible"}`
                  }
                  aria-hidden="true"
                ></i>
              </div>
              <div className="row-label">{checkbox.label}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const setCustomTagError = (
    prev,
    lengthOfPageQuestions,
    questionIndex,
    errorStr
  ) => {
    let errorList = [];
    if (prev instanceof Array) {
      errorList = [...prev];
    } else {
      for (let i = 0; i < lengthOfPageQuestions; i++) {
        errorList.push("");
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
    lengthOfPageQuestions
  ) => {
    if (!index) {
      setErrorMsg((prev) => {
        return setCustomTagError(
          prev,
          lengthOfPageQuestions,
          questionIndex,
          "You must select at least one option."
        );
      });
      setDisplayError(true);
    } else {
      return [question, options[index - 1]];
    }
  };
  const validateCheckBox = (
    checkboxes,
    question,
    questionIndex,
    lengthOfPageQuestions
  ) => {
    let checkedCheckboxes = checkboxes
      .filter((checkbox) => {
        if (checkbox.checked) {
          return true;
        }
        return false;
      })
      .map((checkbox) => {
        return checkbox.label;
      });

    if (checkedCheckboxes.length === 0) {
      setErrorMsg((prev) => {
        return setCustomTagError(
          prev,
          lengthOfPageQuestions,
          questionIndex,
          "You must check at least one checkbox."
        );
      });
    } else {
      return [question, checkedCheckboxes];
    }
  };
  const Page1 = () => {
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
    ({ inputValue = "" }) => {
      return (
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
            className={`${"service_input"} ${
              displayError === undefined
                ? ""
                : displayError
                ? "error"
                : "success"
            }`}
            defaultValue={inputValue}
            placeholder="Enter the title of this product."
            onChange={(e) => handleInputChange(e)}
            autoFocus
          />
          {displayError === true ? <ErrorEle /> : null}
        </QuestionContainer>
      );
    },
    [displayError, QuestionContainer]
  );
  const Page3 = useCallback(() => {
    const [selected, setSelected] = useState();
    const options = [
      "Business services",
      "Creative industries",
      "Entertainment, Food or Events",
      "Financial services",
      "Health & fitness",
      "Home services",
      "Retail /consumer goods",
      "Texhnology / software",
      "other",
    ];
    const checkBoxLabels = [
      "Deployed Product",
      "UI/UX",
      "Front End",
      "Back End",
      "Product Strategy",
      "Blockchain",
    ];
    let lenght_of_questions = 2;
    const question1 = "What industry will this project operate in?";
    const question2 = "Tag your project based on type of work needed.";
    const [checkboxes, changeCheckboxValue] = useState([]);
    let currentQuestionIndex = 0;
    function customPlusFunction() {
      const questionSheetOne = validateSelection(
        options,
        selected,
        question1,
        currentQuestionIndex,
        lenght_of_questions
      );
      const questionSheetTwo = validateCheckBox(
        checkboxes,
        question2,
        currentQuestionIndex + 1,
        lenght_of_questions
      );
      if (questionSheetOne && questionSheetTwo) {
        setstep((prev) => prev + 1);
        setQuestions({
          ...questions,
          ["question" + step.toString()]: [questionSheetOne, questionSheetTwo],
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
        {displayError === true && errorMsg[0] !== "" ? (
          <ErrorEle index={0} />
        ) : null}

        <label
          htmlFor="projectType"
          className="questionOption"
          style={{ marginTop: "40px" }}
        >
          {question2}
        </label>
        <CustomCheckboxMaker
          checkBoxLabels={checkBoxLabels}
          checkboxes={checkboxes}
          setCheckboxes={changeCheckboxValue}
        />
        {displayError === true && errorMsg[1] !== "" ? (
          <ErrorEle index={1} />
        ) : null}
      </QuestionContainer>
    );
  }, [displayError, QuestionContainer]);
  const Page4 = () => {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Funding ask</p>
            <p>{step}/7</p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="number"
            min="0"
            max="10000"
            placeholder="How much will cost to fund this project?"
            className="service_input"
            value={inputValue === " " ? "" : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };

  const Page5 = () => {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Project details</p>
            <p>{step}/7</p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="text"
            placeholder="Tell us a little bit of this project?"
            className="service_input"
            value={inputValue === " " ? "" : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };
  const Page6 = () => {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Size of team</p>
            <p>{step}/7</p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="number"
            min="0"
            max="100"
            placeholder="How many people will be working on this project?"
            className="service_input"
            value={inputValue === " " ? "" : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };
  const Page7 = () => {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Launch date</p>
            <p>{step}/7</p>
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
  const Page8 = () => {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">tell us about your idea</h2>
          </div>
          <label htmlFor="idea">
            <p>Contact details</p>
            <p>{step}/7</p>
          </label>
          {displayError === true ? errorEle() : null}
          <input
            type="email"
            placeholder="What's your email address?"
            className="service_input"
            value={inputValue === " " ? "" : inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <div className="service_page8Btns">
            <button id="leftsubmitBtn" onClick={() => minus()}>
              <span>&#8592;</span>
            </button>
            <button id="submitBtn" onClick={() => plus()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  const Page9 = () => {
    return (
      <div className="service_container">
        <div className="questions">
          <div className="service_sub">
            <h2 id="nomarg">Thank you for submitting your idea!</h2>
            <button className="service_leftbutton" onClick={() => plus()}>
              Submit another idea
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="service tw-mt-12" key={"rigid"}>
      {step == 0 && <Page1 />}
      {step == 1 && (
        <Page2
          inputValue={
            inputValue !== " "
              ? inputValue
              : questions[`question1`]
              ? questions[`question1`]
              : ""
          }
        />
      )}
      {step == 2 && <Page3 />}
      {step == 3 && <Page4 />}
      {step == 4 && <Page5 />}
      {step == 5 && <Page6 />}
      {step == 6 && <Page7 />}
      {step == 7 && <Page8 />}
      {step == 8 && <Page9 />}
    </div>
  );
};

export default LeadsForm;
