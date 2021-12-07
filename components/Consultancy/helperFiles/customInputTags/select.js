import {
  useMemo, useState, useRef, useEffect, Fragment,
} from 'react';
import ErrorPrint from '../errorPrint';

// --->undefined means waiting on submission
// --->null means invalid entry
// -->[] means correct entry
const Select = function ({
  options,
  setSelected,
  selected,
  questionStr = '',
  optionsShowByDefault = false,
  defaultValue,
  children,
  sizeOfParent = 80,
  turnOffLeftBorder = false,
  defaultStr = '...Select an option',
  watchNull,
  colorScheme = {
    mainColor: '',
    hoverColor: '',
    selectedFontColor: '',
  },
}) {
  const [dropDown, setDropDown] = useState(optionsShowByDefault);
  const updatedOptions = useMemo(() => [defaultStr, ...options], [options]);
  const {
    mainColor = '',
    hoverColor = '',
    selectedFontColor = '',
  } = colorScheme;

  const selectedIndex = useRef(
    defaultValue === undefined ? 0 : defaultValue + 1,
  );
  const invalidSymbol = useRef(undefined);

  function validateSubmission() {
    setSelected([questionStr, updatedOptions[selectedIndex.current]]);
  }
  const getRootVariable = (str) => parseInt(
    window.getComputedStyle(document.body).getPropertyValue(`--${str}`),
  );

  const maximumOptionHeight = getRootVariable('maximumOptionPerScrollable');
  const optionHeight = getRootVariable('optionHeight');

  const validateSelection = () => {
    if (selected === null) {
      invalidSymbol.current = selected;
    }
    if (selectedIndex.current === 0) {
      setSelected(invalidSymbol.current);
    } else {
      validateSubmission();
    }
  };

  useEffect(() => {
    if (defaultValue > -1) {
      validateSubmission();
    }
  }, []);
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
    <>
      <div
        style={{ width: '100%', display: 'flex' }}
        id="selectCustomTag"
        style={{ color: mainColor }}
      >
        <style>
          {`
            #selectCustomTag .option-item:hover {
              background-color: ${
                hoverColor || 'var(--transparentNavy)'
              };
            }
          `}
        </style>

        <div
          className={
            `customSelectTag ${dropDown ? 'select-border-bottom ' : ' '}`
          }
          style={{
            width: children ? `${sizeOfParent}%` : '',
            borderTopRightRadius: children ? 0 : '',
            borderBottomRightRadius: children ? 0 : '',
            borderTopLeftRadius: turnOffLeftBorder ? 0 : '',
            borderBottomLeftRadius: turnOffLeftBorder ? 0 : '',
          }}
        >
          <div
            className={
              `selectDisplay ${dropDown ? 'select-border-bottom' : ''}`
            }
          >
            <span>{updatedOptions[selectedIndex.current]}</span>
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
                  selectedIndex.current === index
                    ? 'selected-option-item'
                    : ''
                }`}
                onClick={() => {
                  selectedIndex.current = index;

                  validateSelection();

                  setDropDown(false);
                }}
              >
                <span
                  style={{
                    color:
                        selectedIndex.current === index
                          ? `${
                            selectedFontColor || 'var(--customTagBackgroundColor)'
                          }`
                          : null,
                  }}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            width: `${100 - sizeOfParent}%`,
            justifyContent: 'flex-start',
          }}
          className="invert-colors"
        >
          {children}
        </div>
      </div>
      {selected === null || watchNull ? (
        <ErrorPrint errors={['You must select an option']} />
      ) : null}
    </>
  );
};
export default Select;
