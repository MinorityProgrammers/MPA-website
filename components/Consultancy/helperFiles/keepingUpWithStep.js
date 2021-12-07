import { Fragment } from 'react';

const totalSteps = 9;
const KeepingUpWithStep = function ({ selected, marginTop = 0 }) {
  const calculateLinePercentage = () => (selected === 0 ? 0 : ((selected - 1) / (totalSteps - 1)) * 100);

  const percentageOfBlueLine = Number.isInteger(selected)
    ? calculateLinePercentage()
    : '';

  return (
    <>
      {selected <= totalSteps ? (
        <div
          className="keepingUpLine"
          style={{
            background: `linear-gradient(to right, var(--mpa-navy), var(--mpa-navy) ${percentageOfBlueLine}%, #b9515d ${percentageOfBlueLine}%)`,
            marginTop,
          }}
        >
          <div className="keepingUpItemContainer">
            {[
              ...(function () {
                const range = [];
                for (let i = 0; i < totalSteps; i++) range.push(i + 1);
                return range;
              }()),
            ].map((index) => (
              <span
                key={index}
                className={`${'keepingUpStep'} ${
                  selected >= index ? 'selectedStep' : ''
                }`}
              >
                {index}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default KeepingUpWithStep;
