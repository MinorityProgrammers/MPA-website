import React from 'react';

export default function QuizProgress(props) {
  const { currentQuestion, questionLength } = props;
  return (
    <div>
      <div className="progress">
        <p className="counter">
          <span>
            Question
            {currentQuestion + 1}
            of
            {questionLength}
          </span>
        </p>
        <div
          className="progress-bar"
          style={{
            width: `${((currentQuestion + 1) / questionLength) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
