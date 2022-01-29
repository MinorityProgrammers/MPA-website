import React from 'react';
import Buttons from './buttons';
import KeepingUpWithStep from './keepingUpWithStep';

const QuestionContainer = ({
  children,
  left,
  right,
  marginBottom,
  plus,
  minus,
  step,
  style,
  className = '',
  id = '',
  customPlusText,
  keepingUpMarginTop,
}) => (
  <div
    className={`service_container ${className}`}
    style={{ ...style, marginTop: '2rem' }}
    id={id}
  >
    <div className="questions">
      {children}
      <Buttons
        left={left}
        right={right}
        marginTop={marginBottom}
        plus={plus}
        minus={minus}
        customPlusText={customPlusText}
      />
      <KeepingUpWithStep selected={step - 1} marginTop={keepingUpMarginTop} />
    </div>
  </div>
);

export default QuestionContainer;
