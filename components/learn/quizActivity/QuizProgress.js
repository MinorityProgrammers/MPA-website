import React from 'react';

export default function QuizProgress(props) {
  const { currentQuestion, questionLength } = props;
  return (
    <div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${((currentQuestion + 1) / questionLength) * 100}%`,
          }}
        />
      </div>
      <p className="counter">
          <span>
            Question
            {currentQuestion + 1}
          <span className="total-questions">
            /{questionLength}
        </span>
          </span>
        </p>
    </div>
  );
}
