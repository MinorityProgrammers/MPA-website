import React from 'react';

const InputWithIcon = function ({
  marginTop,
  label,
  placeholder,
  inputRef,
  onChange = () => {},
  defaultValue,
  iconLink,
  validationMethod,
  color = 'var(--mpa-navy)',
  width,
  hideIcon,
  maxLength,
  type,
  min,
  max,
  onInput = () => {},
  id,
}) {
  return (
    <div className="inline-block" style={{ width: width || '80%' }}>
      <label
        htmlFor={id}
        className={marginTop ? 'margin-top' : ''}
        style={{ color }}
      >
        {label}
      </label>
      <div className="wrap" style={{ width: '100%' }}>
        {/* the email input */}
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          className="rep-info"
          ref={inputRef}
          onChange={(e) => {
            onChange(validationMethod);
            if (onInput instanceof Function) onInput(e);
          }}
          defaultValue={defaultValue}
          style={{
            width: '100%',
            paddingLeft: hideIcon ? 'var(--inputWithIconPad)' : '',
          }}
          maxLength={maxLength}
          min={min}
          max={max}
        />
        {/* the icon that stays on this input */}
        {hideIcon ? null : (
          <img src={iconLink} alt="icon2" className="absolute-image" />
        )}
      </div>
    </div>
  );
};
export default InputWithIcon;
