import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import { QuizContext } from '../courseDetails/ActivityDetails';
import QuizProgress from './QuizProgress';
import QuizResult from './QuizResult';

export default function SimpleQuiz() {
  const {
    singleUserModuleInfo,
    forwardInfo,
    course,
    setWatched,
    lastAdvancedModules,
  } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(
    singleUserModuleInfo.moduleId.content.questions,
  );
  const [correct, setCorrect] = useState(0);
  const [inprogress, setInprogress] = useState(true);
  const [answer, setAnswer] = useState();
  const radioRef = useRef();

  const updateAnswer = (e) => {
    const userinput = e.target.value;
    const upDateQuestion = [...questions];
    upDateQuestion[currentQuestion].answerCorrect = JSON.parse(userinput);
    setQuestions(upDateQuestion);
  };
  const checkAnswer = () => {
    const updatedQuestion = [...questions];
    updatedQuestion[currentQuestion].checked = true;
    setQuestions(updatedQuestion);
  };
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    radioRef.current.reset();
  };
  const getResult = () => {
    let _answer = correct;
    questions.forEach((item, index) => {
      if (item.answerCorrect) {
        _answer += 1;
      }
      if (index === questions.length - 1) {
        setCorrect(_answer);
        setInprogress(false);
      }
    });
  };
  const startOver = () => {
    const updateQuestion = [...questions];
    updateQuestion.forEach((item) => {
      delete item.answerCorrect;
      delete item.checked;
    });
    setInprogress(true);
    setCorrect(0);
    setCurrentQuestion(0);
    setQuestions(updateQuestion);
  };
  useEffect(() => {
    const selectedOption = questions[currentQuestion].options.map((option) => {
      const options = {
        option,
        correct: false,
      };
      if (option === questions[currentQuestion].answer) {
        options.correct = true;
      }
      return options;
    });
    setAnswer(selectedOption);
  }, [currentQuestion]);

  return (
    <section className="quiz fade-in" aria-live="polite">
      {!inprogress ? (
        <QuizResult
          singleUserModuleInfo={singleUserModuleInfo}
          forwardInfo={forwardInfo}
          setWatched={setWatched}
          correct={correct}
          questionLength={questions.length}
          startOver={startOver}
          course={course}
          lastAdvancedModules={lastAdvancedModules}
        />
      ) : (
        <div>
          <QuizProgress
            currentQuestion={currentQuestion}
            questionLength={questions.length}
          />
          <div className="question-container">
            <p className="question">{questions[currentQuestion].question}</p>
            <form ref={radioRef}>
                {answer?.map((item, index) => (
                <label 
               htmlFor={`radio-${index}`} 
                // class="input_radio"
                key={`${index + 1}`}
                  className={`option${
                    questions[currentQuestion].checked && !item.correct
                      ? ' dim'
                      : ''
                  }${
                    questions[currentQuestion].checked && item.correct
                      ? ' correct'
                      : ''
                  }`}
                >
                <input id={`radio-${index}`}
                    type="radio"
                    name="option"
                    value={item.correct}
                    disabled={questions[currentQuestion].checked}
                      onClick={updateAnswer}
                      className="input_tag"
                    />
        <span className="q_main">{item.option}</span></label>
                /* <div
                  key={`${index + 1}`}
                  className={`option${
                    questions[currentQuestion].checked && !item.correct
                      ? ' dim'
                      : ''
                  }${
                    questions[currentQuestion].checked && item.correct
                      ? ' correct'
                      : ''
                  }`}
                >
                  <input
                    id={`radio-${index}`}
                    type="radio"
                    name="option"
                    value={item.correct}
                    disabled={questions[currentQuestion].checked}
                    onClick={updateAnswer}
                  />
                  <label htmlFor={`radio-${index}`}>{item.option}</label>
                </div> */
              ))}
            </form>
            <div className="bottom">
              {!questions[currentQuestion].checked && (
                <button
                  type="button"
                  disabled={!('answerCorrect' in questions[currentQuestion])}
                  onClick={checkAnswer}
                >
                  Check Answer
                </button>
              )}
              {currentQuestion + 1 < questions.length
                  && questions[currentQuestion].checked && (
                <div className="spread-bottom">
                    <div className="left_bottom">
                      <svg className="arrow_circle" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" transform="rotate(90 12 12)" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 8L8 12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 12L8 12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 16L8 12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <p className="back">back</p>
                    </div>
                  <button
                    className="fade-in next"
                    type="button"
                    onClick={nextQuestion}
                  >
                    Next
                    {' '}
                    <i className="fa fa-arrow-right" />
                  </button>
                </div>
              )}
              {currentQuestion + 1 === questions.length
                && questions[currentQuestion].checked && (
                  <button
                    type="button"
                    className="get-results pulses"
                    onClick={getResult}
                  >
                    Get Result
                  </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
