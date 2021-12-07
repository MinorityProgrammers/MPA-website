import React from 'react';

export default function QuizProgress(props) {
  return (
    <div>
      <div className="progress">
        <p className="counter">
          <span>
            Question
            {props.currentQuestion + 1}
            {' '}
            of
            {props.questionLength}
          </span>
        </p>
        <div className="progress-bar" style={{ width: `${((props.currentQuestion + 1) / props.questionLength) * 100}%` }} />
      </div>
    </div>
  );
}
