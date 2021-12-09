import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import styles from './InterestForm.module.css';

import { validateField, validateForm, validateStepper } from './FormValidations';
import { errorToast, successToast } from '../../contexts/utils/toasts';

const interestOptions = [
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Research', value: 'research' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Intructing', value: 'intructing' },
  { label: 'Project Management', value: 'Project management' },
];

const passionOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Nature', value: 'nature' },
  { label: 'Music', value: 'music' },
  { label: 'Sports', value: 'sports' },
  { label: 'Entreprenuership', value: 'entreprenuership' },
  { label: 'Reading', value: 'reading' },
  { label: 'Volunteering', value: 'volunteering' },
  { label: 'Arts', value: 'arts' },
  { label: 'Dancing', value: 'dancing' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Cooking', value: 'cooking' },
  { label: 'Animals', value: 'animals' },
  { label: 'Travel', value: 'travel' },
];

const InterestForm = function ({ token }) {
  const [values, setValues] = useState({
    status: 'pending',
    interest: [],
    passion: [],
    profession: '',
    level: '',
    school: '',
    reasons: '',
    support: '',
    contact: '',
    phone: '',
    email: '',
    interestedMembers: 0,
  });

  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmit, toggleSubmit] = useState(false);
  const [activeButton, setActiveButton] = useState('section_1');
  const [sections, setSections] = useState({
    section_1: true,
    section_2: false,
    section_3: false,
    section_4: false,
    section_5: false,
    section_6: false,
    section_7: false,
  });

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setErrors({});
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    setErrors({});
    const result = (validateField(sections, values));
    handleError(result);
  };

  const handleError = (error) => {
    setErrors(error);
  };

  const handleNext = () => {
    setErrors({});
    const result = (validateField(sections, values));
    handleError(result);
    if (Object.keys(result).length === 0) {
      const newSections = { ...sections };
      const newSectionsArray = Object.keys(newSections);
      let id = null;
      newSectionsArray.forEach((_, idx, arr) => {
        newSections[arr[idx]] && (id = idx);
      });
      newSections[newSectionsArray[id]] = false;
      newSections[newSectionsArray[id + 1]] = true;
      setActiveButton(newSectionsArray[id + 1]);
      setSections(newSections);
    }
  };

  const handlePrev = () => {
    setErrors({});
    const newSections = { ...sections };
    const newSectionsArray = Object.keys(newSections);
    let id = null;
    newSectionsArray.forEach((_, idx, arr) => {
      newSections[arr[idx]] && (id = idx);
    });
    newSections[newSectionsArray[id]] = false;
    newSections[newSectionsArray[id - 1]] = true;
    setActiveButton(newSectionsArray[id - 1]);
    setSections(newSections);
  };

  const handleSubmit = () => {
    setErrors({});
    const result = (validateForm(values));
    if (Object.keys(result).length === 0) {
      let _values = { ...values };
      for (const key in _values) {
        if (key === 'passion' || key === 'interest') {
          const objToArr = _values[key].map((val) => {
            if (typeof val === 'object') {
              return val.value;
            }
            return val;
          });
          _values = { ..._values, [key]: objToArr };
        }
      }

      if (token) {
        axios.post('http://koinstreet-learn-api.herokuapp.com/api/v1/chapter', {
          ..._values,
        }, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
          .then((response) => {
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

  const handleStepperClick = (step) => {
    const result = (validateStepper(sections, values, step));
    if (Object.keys(result).length === 0) {
      const newSections = { ...sections };
      Object.keys(newSections).forEach((section_key) => {
        if (section_key === step) {
          newSections[section_key] = true;
          setActiveButton(section_key);
        } else {
          newSections[section_key] = false;
        }
      });
      setSections(newSections);
    } else {
      // handleError(result)
    }
  };

  const getButtonStatus = (button) => {
    const sectionsToArray = Object.keys(sections);
    if (sectionsToArray.indexOf(activeButton) > sectionsToArray.indexOf(button)) {
      return { background: 'pink' };
    } if (sectionsToArray.indexOf(activeButton) < sectionsToArray.indexOf(button)) {
      return { background: '#d1d3d1' };
    }
    return { background: '#ff00b8' };
  };

  const getLineStatus = (button) => {
    const sectionsToArray = Object.keys(sections);
    if (sectionsToArray.indexOf(activeButton) > sectionsToArray.indexOf(button)) {
      return { background: 'pink' };
    } if (sectionsToArray.indexOf(activeButton) < sectionsToArray.indexOf(button)) {
      return { background: '#d1d3d1' };
    }
    return { background: 'pink' };
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
        <div className={styles.title}>Interest Form</div>
        {
          !isSubmit
            ? (
              <>
                <form onSubmit={(handleSubmit)} className={styles.form}>
                  <section className={styles.question} style={{ display: sections.section_1 ? 'block' : 'none' }}>
                    <label className={styles.label}>1. Are you a student or a professional?</label>
                    <div>
                      <div className={styles.innerLabel}>
                        <input
                          type="radio"
                          name="profession"
                          value="student"
                          className={styles.radio}
                          onChange={handleChange}
                        />
                        <span>Student</span>
                      </div>
                      <div className={styles.innerLabel}>
                        <input
                          type="radio"
                          name="profession"
                          value="Professional"
                          className={styles.radio}
                          onChange={(e) => { setValues({ ...values, school: '', level: '' }); handleChange(e); }}
                        />
                        <span>Professional</span>
                      </div>
                      {errors.profession && (
                      <div className={styles.inputFeedback}>{errors.profession}</div>
                      )}
                    </div>
                  </section>

                  {
                  values.profession === 'student' ? (
                    <>
                      <section className={styles.question} style={{ display: sections.section_1 ? 'block' : 'none' }}>
                        <label className={`${styles.label}`}>1-1. Are you a high school or college student?</label>
                        <div>
                          <div className={styles.innerLabel}>
                            <input
                              type="radio"
                              name="level"
                              value="high school student"
                              className={styles.radio}
                              onChange={handleChange}
                            />
                            <span>High School Student</span>
                          </div>
                          <div className={styles.innerLabel}>
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

                      <section className={styles.question} style={{ display: sections.section_1 ? 'block' : 'none' }}>
                        <label className={styles.label} htmlFor="school">1-2. Please Enter the name of your school.</label>
                        <input
                          name="school"
                          type="text"
                          value={values.school}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={styles.textInput}
                        />
                        {errors.school && (
                          <div className={styles.inputFeedback}>{errors.school}</div>
                        )}
                      </section>
                    </>
                  ) : null
                }

                  <section className={styles.question} style={{ display: sections.section_2 ? 'block' : 'none' }}>
                    <label className={styles.label}>2. What are your fields of interest?</label>
                    <div className={styles.select}>
                      <Select
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

                  <section className={styles.question} style={{ display: sections.section_3 ? 'block' : 'none' }}>
                    <label className={styles.label}>3. What are you passionate about?</label>
                    <div className={styles.select}>
                      <Select
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

                  <section className={styles.question} style={{ display: sections.section_4 ? 'block' : 'none' }}>
                    <label className={styles.label}>4. What is your reason for wanting to start a chapter?</label>
                    <textarea
                      name="reasons"
                      value={values.reasons}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.textareaInput}
                    />
                    {errors.reasons && (
                    <div className={styles.inputFeedback}>{errors.reasons}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_5 ? 'block' : 'none' }}>
                    <label className={styles.label}>5. What kind of support would you like for starting a chapter?</label>
                    <textarea
                      name="support"
                      value={values.support}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.textareaInput}
                    />
                    {errors.support && (
                    <div className={styles.inputFeedback}>{errors.support}</div>
                    )}
                  </section>

                  <section className={styles.question} style={{ display: sections.section_6 ? 'block' : 'none' }}>
                    <label className={styles.label}>6. How many interested members do you have right now?</label>
                    <input
                      name="interestedMembers"
                      type="number"
                      min="0"
                      value={values.interestedMembers}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.numberInput}
                    />
                  </section>

                  <section className={styles.question} style={{ display: sections.section_7 ? 'block' : 'none' }}>
                    <label className={styles.label}>7. Best way of contacting you</label>
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
                          className={styles.emailInput}
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
                          className={styles.phoneInput}
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
                      <div style={{ display: sections.section_7 ? 'none' : 'block' }} className={`${styles.button} ${styles.next}`} onClick={handleNext}>
                        Next
                        <i className="fas fa-angle-right" />
                      </div>
                      <div style={{ display: sections.section_7 ? 'block' : 'none' }} className={`${styles.button} ${styles.submit}`} onClick={handleSubmit}>Submit</div>
                    </div>
                  </div>
                </form>
                <div className={styles.stepperWrapper}>
                  <div className={styles.stepperContainer}>
                    <div className={styles.stepperButtons}>
                      <div className={styles.stepperButton} style={getButtonStatus('section_1')} onClick={() => handleStepperClick('section_1')}>1</div>
                      <div className={styles.stepperLine} style={getLineStatus('section_2')} />
                      <div className={styles.stepperButton} style={getButtonStatus('section_2')} onClick={() => handleStepperClick('section_2')}>2</div>
                      <div className={styles.stepperLine} style={getLineStatus('section_3')} />
                      <div className={styles.stepperButton} style={getButtonStatus('section_3')} onClick={() => handleStepperClick('section_3')}>3</div>
                      <div className={styles.stepperLine} style={getLineStatus('section_4')} />
                      <div className={styles.stepperButton} style={getButtonStatus('section_4')} onClick={() => handleStepperClick('section_4')}>4</div>
                      <div className={styles.stepperLine} style={getLineStatus('section_5')} />
                      <div className={styles.stepperButton} style={getButtonStatus('section_5')} onClick={() => handleStepperClick('section_5')}>5</div>
                      <div className={styles.stepperLine} style={getLineStatus('section_6')} />
                      <div className={styles.stepperButton} style={getButtonStatus('section_6')} onClick={() => handleStepperClick('section_6')}>6</div>
                      <div className={styles.stepperLine} style={getLineStatus('section_7')} />
                      <div className={styles.stepperButton} style={getButtonStatus('section_7')} onClick={() => handleStepperClick('section_7')}>7</div>
                    </div>
                    {/* <div className={styles.stepperLine} /> */}
                  </div>
                </div>
              </>
            )
            : (
              <section className={styles.thankyouSection}>
                Thank you for submitting!
              </section>
            )
        }
      </div>
    </div>
  );
};

export default InterestForm;
