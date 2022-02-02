import React from 'react';
import Select, { components } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import styles from '../../styles/settings/createSettingInput.module.css';

const CreateSettingInput = ({
  label,
  type,
  name,
  options,
  required,
  value,
  setValue,
  placeholder,
  halfWidth,
  rightSpaced,
  leftSpaced,
}) => {
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    if (setValue) {
      setValue(e.target.value);
    }
  };

  const handleSwitchChange = () => (setValue
    ? {
      value: options.find((option) => option.label === value),
      onChange: (e) => {
        setValue(e.value);
      },
    }
    : {});

  const reactSelectKey = `${router.pathname.substring(
    router.pathname.lastIndexOf('/') + 1,
  )}-select-key-${Math.floor(Math.random() * 10)}`;

  switch (type) {
    case 'select':
      const DropdownIndicator = function (props) {
        return (
          <components.DropdownIndicator {...props}>
            <img
              src="../../assets/images/settings/arrow-down.svg"
              alt="dropdown icon"
              style={{ height: '1vw' }}
            />
          </components.DropdownIndicator>
        );
      };
      const selectStyles = {
        indicatorSeparator: (base) => ({
          ...base,
          display: 'none',
        }),
        control: (base) => ({
          ...base,
          border: 0,
          boxShadow: 'none',
        }),
      };
      return (
        <label
          className={`${
            halfWidth
              ? styles.halfInputLabel
              : name === 'Ethnicity'
                ? `${styles.ethnInputLabel} ${styles.rightSpaced}`
                : name === 'proficiency'
                  ? `${styles.profPassInputLabel} ${styles.rightSpaced}`
                  : styles.inputLabel
          } ${halfWidth && rightSpaced ? styles.rightSpaced : ''}`}
        >
          {![
            'proficiency',
            'passions',
            'softSkills',
            'programmingSkills',
          ].includes(name) && (
            <p>
              {label}
              {required ? <span className="cp-required">*</span> : ''}
            </p>
          )}
          <Select
            className="tw-text-md"
            options={options}
            name={name}
            {...handleSwitchChange()}
            components={{ DropdownIndicator }}
            styles={selectStyles}
            id={reactSelectKey}
            instanceId={reactSelectKey}
            placeholder={placeholder || 'Select...'}
          />
        </label>
      );

    case 'date':
      return (
        <label
          className={`${
            halfWidth ? styles.halfInputLabel : styles.inputLabel
          } ${halfWidth && rightSpaced ? styles.rightSpaced : ''}`}
        >
          <p>
            {label}
            {required ? <span className="cp-required">*</span> : ''}
          </p>
          <DatePicker
            minDate={
              (name === 'birthday' && new Date(1950, 0, 1))
              || (name === 'enteredHighSchoolYear' && new Date(1968, 0, 1))
              || (name === 'expectedGraduationYear' && new Date(1970, 0, 1))
            }
            maxDate={name === 'birthday' && new Date(2010, 11, 31)}
            className="datepicker"
            value={value}
            selected={value}
            onChange={(date) => {
              setValue(date);
            }}
            dateFormat="MM/dd/yyyy"
            placeholder="mm/dd/yyyy"
            autoComplete="false"
            required
          />
        </label>
      );
    case 'textarea':
      return (
        <label className={styles.inputLabel}>
          <p>
            {label}
            {required ? <span className="cp-required">*</span> : ''}
          </p>
          <textarea
            name={name}
            onChange={handleChange}
            autoComplete="false"
            placeholder="Describe your favorite code..."
            value={value || ''}
          />
        </label>
      );
    case 'radio':
      return (
        <div className={styles.radioWrap}>
          <h5>{label}</h5>
          <div className={styles.inputRadioLabel}>
            <div className={styles.visibility} onClick={() => setValue(true)}>
              <div
                className={`${styles.radioBtn} ${
                  value ? styles.checkedRadioBtn : ''
                }`}
              />
              <span>Public</span>
            </div>
            <div className={styles.visibility} onClick={() => setValue(false)}>
              <div
                className={`${styles.radioBtn} ${
                  !value ? styles.checkedRadioBtn : ''
                }`}
              />
              <span>Private</span>
            </div>
          </div>
        </div>
      );
    case 'checkbox':
      return (
        <div
          className={styles.inputCheckboxLabel}
          onClick={() => setValue(!value)}
        >
          <img
            src={
              value
                ? '../../assets/images/settings/checked.svg'
                : '../../assets/images/settings/unchecked.svg'
            }
            alt={`${value ? 'check' : 'uncheck'} icon`}
          />
          <p>
            {label}
            {required ? <span className="cp-required">*</span> : ''}
          </p>
        </div>
      );
    default:
      return (
        <label
          className={`${
            halfWidth ? styles.halfInputLabel : styles.inputLabel
          } ${
            name === 'passions'
              ? `${styles.profPassInputLabel} ${styles.rightSpaced}`
              : ' '
          } ${halfWidth && rightSpaced ? styles.rightSpaced : ' '} ${
            leftSpaced ? styles.leftSpaced : ' '
          } ${
            name === 'userName'
              ? 'securityLoginPasswordInput'
              : name === 'email'
                ? 'securityEmailInput'
                : ' '
          }`}
        >
          {!leftSpaced
            && ![
              'proficiency',
              'passions',
              'softSkills',
              'programmingSkills',
            ].includes(name) && (
              <p>
                {label}
                {required ? <span className="cp-required">*</span> : ''}
              </p>
          )}
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            autoComplete="false"
            placeholder={placeholder || ''}
          />
        </label>
      );
  }
};

export default CreateSettingInput;
