import React from 'react';
import Buttons from './buttons';
import KeepingUpWithStep from './keepingUpWithStep';

const QuestionContainer = function ({
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
}) {
  // useEffect(() => {
  //   function onKeyMove(btn) {
  //     console.log(btn);
  //     if (btn === "Enter") {
  //       plus();
  //     } else if (btn === "Backspace") {
  //       minus();
  //     }
  //   }
  //   function exec_key(e) {
  //     onKeyMove(e.code);
  //   }
  //   window.addEventListener("keydown", exec_key);
  //   return () => window.removeEventListener("keypress", exec_key);
  // }, []);
  return (
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
};
export default QuestionContainer;
