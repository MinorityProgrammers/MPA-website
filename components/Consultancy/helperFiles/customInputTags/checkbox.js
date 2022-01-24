import React, { useEffect, useRef } from 'react';
import ErrorPrint from '../errorPrint';

const Checkboxes = ({
  checkboxes,
  setCheckboxes,
  checkBoxLabels,
  questionStr,
  minimumCheckBoxes = 1,
  defaultValue,
}) => {
  const invalidSymbol = useRef(undefined);

  const options = useRef([
    ...(() => {
      const arr = [];
      for (let i = 0; i < checkBoxLabels.length; i += 1) {
        const bool = defaultValue
          ? defaultValue.indexOf(checkBoxLabels[i]) !== -1
          : false;
        const obj = { label: checkBoxLabels[i], checked: bool };
        arr.push(obj);
      }
      return arr;
    })(),
  ]);
  function validateSubmission(validList) {
    setCheckboxes([questionStr, validList]);
  }
  useEffect(() => {
    if (defaultValue) {
      validateSubmission(defaultValue);
    }
  }, []);
  const validateCheckBox = () => {
    const checkedCheckboxes = options.current
      .filter((checkbox) => {
        if (checkbox.checked) {
          return true;
        }
        return false;
      })
      .map((checkbox) => checkbox.label);

    if (checkboxes === null) {
      invalidSymbol.current = checkboxes;
    }
    if (checkedCheckboxes.length < minimumCheckBoxes) {
      setCheckboxes(invalidSymbol.current);
    } else {
      validateSubmission(checkedCheckboxes);
    }
  };

  return (
    <>
      <div className="checkboxWrapper">
        {options.current.map((checkbox, index) => (
          <div className="row" key={`${`checkbox${index}`}`}>
            <div
              className="checkbox"
              onClick={() => {
                options.current[index].checked =
                  !options.current[index].checked;
                validateCheckBox();
              }}
            >
              <i
                className={
                  'fa fa-check ' +
                  `${checkbox.checked ? 'checkVisible' : 'checkInvisible'}`
                }
                aria-hidden="true"
              />
            </div>
            <div className="row-label">{checkbox.label}</div>
          </div>
        ))}
      </div>
      {checkboxes === null ? (
        <ErrorPrint
          errors={[`You must select at least ${minimumCheckBoxes} checkbox(s)`]}
        />
      ) : null}
    </>
  );
};

export default Checkboxes;
