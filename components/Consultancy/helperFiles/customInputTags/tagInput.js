import React, { useEffect, useMemo, useRef } from 'react';

const defaultCriteriaCheck = (callback, input, prevArr) => {
  if (input.length > 0 && prevArr.indexOf(input) === -1) {
    callback();
  }
};
const TagInput = function ({
  children,
  listOfTags,
  updateListOfTags,
  criteriaCheck = defaultCriteriaCheck,
  targetCode = 'Enter',
}) {
  const inputRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    function handleTagCreation(rr) {
      // function that actually saves the input
      function callback() {
        updateListOfTags((prev) => [...prev, inputRef.current.value]);
        inputRef.current.value = '';
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
      }
      // check to see that the we are listening on submission of new tag
      if (
        rr.code === targetCode
        && inputRef.current === document.activeElement
      ) {
        try {
          /*
            call end users validation function,
            if the function sent back is invalid, we run my validation function.
            we also send in a function that the end user runs when the validation test passes,
            the input string end user could use for validation, an array of list of all tags.
          */
          criteriaCheck(
            () => {
              callback();
            },
            inputRef.current.value,
            [...listOfTags],
          );
        } catch (err) {
          defaultCriteriaCheck(
            () => {
              callback();
            },
            inputRef.current.value,
            [...listOfTags],
          );
        }
      }
    }

    window.addEventListener('keydown', handleTagCreation);
    return () => window.removeEventListener('keydown', handleTagCreation);
  }, [listOfTags]);

  const calculateWidth = useMemo(() => {
    if (listOfTags.length > 0) {
      return 'small-width';
    }
    return '';
  }, [listOfTags]);
  return (
    <section
      className="uniform-input"
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
      ref={containerRef}
    >
      <section className="contain-tags">
        {listOfTags.map((tag, index) => (
          <div key={`${index + 1}`}>
            <span>{tag}</span>
            <span
              onClick={() => {
                updateListOfTags((prev) => {
                  const retArr = [...prev];
                  const indexOfRemoved = retArr.indexOf(tag);
                  retArr.splice(indexOfRemoved, 1);
                  return retArr;
                });
              }}
            >
              &times;
            </span>
            {' '}
          </div>
        ))}
      </section>
      <input
        type="text"
        placeholder={children}
        className={`tags-input ${calculateWidth}`}
        ref={inputRef}
      />
    </section>
  );
};
export default TagInput;
