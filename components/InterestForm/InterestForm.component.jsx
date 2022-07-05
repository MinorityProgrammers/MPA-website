import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import Geocode from 'react-geocode';
import { errorToast, successToast } from '../../contexts/utils/toasts';
import { validateField, validateForm } from './FormValidations';
import styles from './InterestForm.module.css';
import DropdownIndicator from '../settings/DropdownIndicator';
import {
  countries, passionOptions, interestOptions, countriesLoaction,
} from './Options';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    border: state.isSelected ? '2px solid #6938EF' : state.isFocused ? '2px solid #6938EF' : '2px solid transparent',
    background: '#1C1D37',
    borderRadius: '8px',
    padding: 20,
    marginTop: 8,
    width: '100%',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':active': {
      // ...styles[':active'],
      background: '#1C1D37',
    },
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    // width: ,
    display: 'flex',
    height: '100%',
  }),
  menu: (provided) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    background: '#1C1D37',
    padding: 5,
    border: '1px solid #6938EF',
    width: '100%',
    textAlign: 'center',
    // marginLeft: '-70px',
  }),
  container: (provided) => ({
    ...provided,
    height: '60px',
    margin: '0 !important',
    cursor: 'pointer',
    paddingLeft: '8px',
    border: '1px solid #6938EF',
    borderRadius: '16px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    border: '1px solid #6938EF',
    borderRadius: '100px',
    background: 'transparent',
    padding: '5px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  singleValue: (provided) => {
    const opacity = 1;
    const color = '#fff';
    const transition = 'opacity 300ms';

    return {
      ...provided, opacity, transition, color,
    };
  },
};

const InterestForm = ({ token, userData }) => {
  const [values, setValues] = useState({
    status: 'pending',
    interest: [],
    passion: [],
    profession: '',
    level: '',
    location: '',
    description: '',
    mission: '',
    contact: '',
    phone: '',
    email: '',
    country: '',
    lat: '',
    lon: '',
    city: '',
    interestedMembers: 0,
  });

  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmit, toggleSubmit] = useState(false);
  const [sections, setSections] = useState({
    section_1: true,
    section_2: false,
    section_3: false,
    section_4: false,
    section_5: false,
    section_6: false,
    section_7: false,
    section_8: false,
    section_9: false,
  });

  Geocode.setApiKey('AIzaSyAj-BtIthMo51RCnyjesNP11pF_R07qbMA&callback');

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setErrors({});
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleError = (error) => {
    setErrors(error);
  };

  const handleBlur = () => {
    setErrors({});
    const result = (validateField(sections, values));
    handleError(result);
  };

  const handleNext = () => {
    setErrors({});
    const result = (validateField(sections, values));
    handleError(result);
    if (Object.keys(result).length === 0) {
      let newSections = { ...sections };
      let newSectionsArray = Object.keys(newSections);
      if (values.profession === 'Professional') {
        newSectionsArray = newSectionsArray.filter((e) => e !== 'section_2');
        delete newSections.section_2;
      } else if (values.profession === 'student' && newSections.section_1) {
        newSections = {
          section_1: true,
          section_2: false,
          section_3: false,
          section_4: false,
          section_5: false,
          section_6: false,
          section_7: false,
          section_8: false,
          section_9: false,
        };
        newSectionsArray = Object.keys(newSections);
      }
      let id = null;
      setSections(newSections);

      newSectionsArray.forEach((_, idx, arr) => {
        if (newSections[arr[idx]]) {
          id = idx;
        }
      });
      newSections[newSectionsArray[id]] = false;
      newSections[newSectionsArray[id + 1]] = true;
      setSections(newSections);
    }
    if (sections.section_4 === true) {
      // Get latitude & longitude from address.
      Geocode.setRegion(values.country.value.toLowerCase());
      Geocode.fromAddress(values.location).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const newValue = values;
          newValue.lat = lat;
          newValue.lon = lng;
          setValues(newValue);
        },
        (error) => {
          countriesLoaction.forEach((country) => {
            if (country.code === values.country.value) {
              const newValue = values;
              newValue.lat = country.latitude;
              newValue.lon = country.longitude;
              setValues(newValue);
            }
          });
          console.error(error);
        },
      );
    }
  };

  const handlePrev = () => {
    setErrors({});
    const newSections = { ...sections };
    const newSectionsArray = Object.keys(newSections);
    let id = null;
    newSectionsArray.forEach((_, idx, arr) => {
      if (newSections[arr[idx]]) {
        id = idx;
      }
    });
    newSections[newSectionsArray[id]] = false;
    newSections[newSectionsArray[id - 1]] = true;
    setSections(newSections);
  };
  const getWidth = (stats) => {
    let step = 0;
    const arr = Object.values(stats);
    step = arr.indexOf(true);
    step /= (arr.length - 1);
    step = `${step * 100}%`;
    return step;
  };
  const handleSubmit = () => {
    setErrors({});
    console.log(values);
    const result = (validateForm(values));
    if (Object.keys(result).length === 0) {
      let _values = { ...values };

      Object.keys(_values).forEach((key) => {
        if (key === 'passion' || key === 'interest') {
          const objToArr = _values[key].map((val) => {
            if (typeof val === 'object') {
              return val.value;
            }
            return val;
          });
          _values = { ..._values, [key]: objToArr };
        }
      });

      if (token) {
        console.log(_values);
        toggleSubmit(true);

        // Main St, Harrisonburg, US
        const inputs = {
          location: _values.location,
          LocationName: `${_values.city}, ${_values.country.value}`,
          chapter_leader: `${userData.firstName} ${userData.lastName}`,
          description: _values.description,
          mission: _values.mission,
          latitude: _values.lat,
          longitude: _values.longitude,
          member_size: '1',
          phone: _values.phone,
          email: _values.email,
          interestedMembers: _values.interestedMembers,
          profession: _values.profession,
          passion: _values.passion,
          interest: _values.interest,
          // eslint-disable-next-line new-cap
          date_founded: new Date().toDateString(),
        };
        setSubmitError('');
        axios.post('http://localhost:5000/api/v1/location', inputs, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
          .then((res) => {
            console.log(res.data.data);
            setSubmitError('');
            successToast('Your chapter was successfully created');
            toggleSubmit(true);
          })
          .catch((error) => {
            setSubmitError('Please check your network and try again.');
            errorToast('Failed to create a chapter');
            toggleSubmit(false);
            console.log('error: ', error);
          });
      } else {
        setSubmitError('Please ensure that you are logged in and try again');
      }
    } else {
      handleError(result);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        {submitError
          && (
          <div className={styles.submitFeedbackWrapper}>
            <div className={styles.submitFeedback}>
              <div className={styles.submitErrorTitle}>
                <i style={{ color: '#f356c7' }} className="fas fa-exclamation-circle" />
                {' '}
                There was an issue creating your page!
              </div>
              <div className={styles.submitErrorMessage}>{submitError}</div>
              <div className={styles.errorClose} onClick={() => setSubmitError('')}>close</div>
            </div>
          </div>
          )}
        {
          !isSubmit
            ? (
              <>
                <div className={styles.stepperWrapper}>
                  <div style={{ width: getWidth(sections) }} className={styles.stepperContainer} />
                </div>
                <div className={styles.questionNum}>
                  {' '}
                  {`Question ${(Object.values(sections).indexOf(true)) + 1}`}
                </div>
                <form onSubmit={(handleSubmit)} className={styles.form}>

                  <section className={styles.question} style={{ display: sections.section_1 ? 'block' : 'none' }}>
                    <label className={styles.label}>Who are you?</label>
                    <div className={`${styles.professionLabel}`}>
                      <div
                        className={`${styles.innerLabel}`}
                        onClick={() => handleChange({ target: { name: 'profession', value: 'student' } })}
                      >
                        <img
                          src="/assets/images/chapter/student.png"
                          style={{ mixBlendMode: values.profession !== 'student' ? 'luminosity' : 'unset' }}
                          alt="student"
                        />
                        <div>
                          Student
                        </div>
                      </div>
                      <div
                        className={styles.innerLabel}
                        onClick={() => { setValues({ ...values, location: '', level: '' }); handleChange({ target: { name: 'profession', value: 'Professional' } }); }}
                      >
                        <img
                          src="/assets/images/chapter/pro.png"
                          style={{ mixBlendMode: values.profession !== 'Professional' ? 'luminosity' : 'unset' }}
                          alt="Professional"
                        />
                        <div>
                          Professional
                        </div>
                      </div>
                      {errors.profession && (
                        <div className={styles.inputFeedback}>{errors.profession}</div>
                      )}
                    </div>
                  </section>
                  <section className={styles.question} style={{ display: sections.section_2 ? 'block' : 'none' }}>
                    <label className={`${styles.label}`}>Are you a high school or college student?</label>
                    <div>
                      <div className={`${styles.innerLabel} ${styles.radioField}`}>
                        <input
                          type="radio"
                          name="level"
                          value="high school student"
                          className={styles.radio}
                          onChange={handleChange}
                        />
                        <span>High School Student</span>
                      </div>
                      <div className={`${styles.innerLabel} ${styles.radioField}`}>
                        <input
                          type="radio"
                          name="level"
                          value="college student"
                          className={styles.radio}
                          onChange={handleChange}
                        />
                        <span>College Student</span>
                      </div>
                      {errors.level && (
                        <div className={styles.inputFeedback}>{errors.level}</div>
                      )}
                    </div>
                  </section>
                  <section className={styles.question} style={{ display: sections.section_3 ? 'block' : 'none' }}>
                    <label className={styles.label} htmlFor="location">Please enter the location name?</label>
                    <input
                      name="location"
                      type="text"
                      placeholder="School Name (e.g University Of Miami)..."
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.textInput}
                    />
                    <label style={{ marginTop: '30px' }} className={styles.label} htmlFor="country">Please Select country?</label>
                    <div className={styles.select}>
                      <Select
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        style={{ zIndex: 10 }}
                        name="country"
                        value={values.country}
                        options={countries}
                        onChange={(e) => handleChange({ target: { name: 'country', value: e } })}
                      />
                      <label style={{ marginTop: '30px' }} className={styles.label} htmlFor="city">Please enter the city?</label>
                      <input
                        name="city"
                        type="text"
                        placeholder="Harrisonburg"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.textInput}
                      />
                    </div>
                    {errors.school && (
                    <div className={styles.inputFeedback}>{errors.school}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_4 ? 'block' : 'none' }}>
                    <label className={styles.label}>What are your fields of interest?</label>
                    <div className={styles.select}>
                      <Select
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        style={{ zIndex: 10 }}
                        closeMenuOnSelect={false}
                        name="interest"
                        value={values.interest}
                        isMulti
                        options={interestOptions}
                        onChange={(e) => handleChange({ target: { name: 'interest', value: e } })}
                      />
                    </div>
                    {errors.interest && (
                    <div className={styles.inputFeedback}>{errors.interest}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_5 ? 'block' : 'none' }}>
                    <label className={styles.label}>What are you passionate about?</label>
                    <div className={styles.select}>
                      <Select
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        closeMenuOnSelect={false}
                        name="passion"
                        value={values.passion}
                        isMulti
                        options={passionOptions}
                        onChange={(e) => handleChange({ target: { name: 'passion', value: e } })}
                      />
                    </div>
                    {errors.passion && (
                    <div className={styles.inputFeedback}>{errors.passion}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_6 ? 'block' : 'none' }}>
                    <label className={styles.label}>
                      Please give a brief description for the chapter?

                    </label>
                    <textarea
                      name="description"
                      placeholder="The reason I’d like to start a chapter is..."
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.textareaInput}
                    />
                    {errors.reasons && (
                    <div className={styles.inputFeedback}>{errors.reasons}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_7 ? 'block' : 'none' }}>
                    <label className={styles.label}>
                      What is your reason for wanting to start a chapter?
                    </label>
                    <textarea
                      name="mission"
                      value={values.mission}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.textareaInput}
                    />
                    {errors.support && (
                    <div className={styles.inputFeedback}>{errors.support}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_8 ? 'block' : 'none' }}>
                    <label className={styles.label}>
                      How many interested members do you have right now?
                    </label>
                    <div className={styles.numberInputContainer}>
                      <input
                        name="interestedMembers"
                        type="text"
                        min="0"
                        value={values.interestedMembers}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.numberInput}
                      />
                      <div>
                        <img
                          src="/assets/images/chapter/arrow-top.svg"
                          onClick={() => setValues((prevValues) => ({
                            ...prevValues,
                            interestedMembers: values.interestedMembers + 1,
                          }))}
                          alt="arrow"
                        />
                        <img
                          src="/assets/images/chapter/arrow-down.svg"
                          onClick={() => setValues((prevValues) => ({
                            ...prevValues,
                            interestedMembers:
                             values.interestedMembers === 0
                               ? values.interestedMembers : values.interestedMembers - 1,
                          }))}
                          alt="arrow"
                        />
                      </div>
                    </div>
                  </section>

                  <section className={styles.question} style={{ display: sections.section_9 ? 'block' : 'none' }}>
                    <label className={styles.label}> Best way of contacting you</label>
                    <div>
                      <div className={styles.innerLabel}>
                        <input
                          type="radio"
                          name="contact"
                          value="email"
                          className={styles.radio}
                          onChange={(e) => { setValues({ ...values, email: '', phone: '' }); handleChange(e); }}
                        />
                        Email
                      </div>
                      {
                      values.contact === 'email'
                      && (
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="enter your email address"
                          className={styles.textInput}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      )
                    }
                      <div className={styles.innerLabel}>
                        <input
                          type="radio"
                          name="contact"
                          value="phone"
                          className={styles.radio}
                          onChange={(e) => { setValues({ ...values, email: '', phone: '' }); handleChange(e); }}
                        />
                        Phone
                      </div>
                      {
                      values.contact === 'phone'
                      && (
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="enter your phone number"
                          className={styles.textInput}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      )
                    }
                      {errors.contact && (
                      <div className={styles.inputFeedback}>{errors.contact}</div>
                      )}
                    </div>
                  </section>

                  <div className={styles.buttonWrapper}>
                    <div className={styles.buttonContainer}>
                      <div style={{ display: sections.section_1 ? 'none' : 'block' }} className={`${styles.button} ${styles.prev}`} onClick={handlePrev}>
                        <i className="fas fa-angle-left" />
                        {' '}
                        Back
                      </div>
                      <div style={{ display: sections.section_9 ? 'none' : 'block' }} className={`${styles.button} ${styles.next}`} onClick={handleNext}>
                        Next
                      </div>
                      <div style={{ display: sections.section_9 ? 'block' : 'none' }} className={`${styles.button} ${styles.next}`} onClick={handleSubmit}>Submit</div>
                    </div>
                  </div>
                </form>

              </>
            )
            : (
              <section className={styles.thankyouSection}>
                <img
                  src="/assets/images/chapter/finished.png"
                  alt="submitted"
                />
              </section>
            )
        }
      </div>
    </div>
  );
};

export default InterestForm;
