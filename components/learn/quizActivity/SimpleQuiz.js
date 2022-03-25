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
  const [checkingAnswer, setCheckingAnswer] = useState(false);
  const [inprogress, setInprogress] = useState(true);
  const [answer, setAnswer] = useState();
  const radioRef = useRef();
  // for options type of answer
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
    setCheckingAnswer(true);
  };
  // for text answer
  const updateTextAnswer = (e) => {
    const userinput = e.target.value.toLowerCase();
    const upDateQuestion = [...questions];
    userinput !== questions[currentQuestion].answer
      ? upDateQuestion[currentQuestion].answerCorrect = false
      : upDateQuestion[currentQuestion].answerCorrect = true;
    setQuestions(upDateQuestion);
  };
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setCheckingAnswer(false);
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
    <section className="quiz fade-in d-flex justify-content-center align-items-center" aria-live="polite">
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
        <div className="">
          <QuizProgress
            currentQuestion={currentQuestion}
            questionLength={questions.length}
          />
          {/* question and answer containerr */}
          <div className="question-container">
            <p className="question">{questions[currentQuestion].question}</p>
            {/* answer area radio buttons */}
            <form className="d-flex flex-column" ref={radioRef}>
              {answer?.map((item, index) => (
                <label
                  htmlFor={`radio-${index}`}
                  // class="input_radio"
                  key={`${index + 1}`}
                  className={`option${questions[currentQuestion].checked && !item.correct
                    ? ' dim'
                    : ''
                    }${questions[currentQuestion].checked && item.correct
                      ? ' correct'
                      : ' incorrect'
                    }`}
                >
                  <input
                    id={`radio-${index}`}
                    type={questions[currentQuestion].checked && item.correct ? 'checkbox' : 'radio'}
                    checked={questions[currentQuestion].checked && item.correct && 'checked'}
                    name="option"
                    value={item.correct}
                    // disabled={questions[currentQuestion].checked}
                    onClick={updateAnswer}
                    className="input_tag"
                  />
                  <span className="q_main">{item.option}</span>

                </label>

              ))}
              {/* Uncomment this input when text answer required */}
              {/* <input
                className="quiz-text-input"
                onChange={updateTextAnswer}
                type="text"
                disabled={checkingAnswer}
                pattern="worlde"
              /> */}
            </form>

            <div className="bottom tw-w-100">
              {!questions[currentQuestion].checked && (
                <div className="spread-bottom d-flex flex-row justify-content-between tw-w-100">
                  <button
                    className="fade-in next"
                    type="button"
                    onClick={() => { setWatched(false); }}
                  >
                    Close Quiz
                  </button>
                  <button
                    className="fade-in next"
                    type="button"
                    disabled={!('answerCorrect' in questions[currentQuestion])}
                    onClick={checkAnswer}
                  >
                    Check Answer
                  </button>
                </div>
              )}
              {currentQuestion + 1 < questions.length
                && questions[currentQuestion].checked && (
                  <div className="spread-bottom d-flex flex-row justify-content-between tw-w-100">
                    <button
                      className="fade-in next"
                      type="button"
                      onClick={() => { setWatched(false); }}
                    >
                      Close Quiz
                    </button>
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
