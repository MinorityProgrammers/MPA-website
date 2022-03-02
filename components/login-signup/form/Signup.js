import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import register from '../../../contexts/actions/auth/register';
import { GlobalContext } from '../../../contexts/provider';
import { InputField } from '../../TextField';
import styles from '../../../styles/auth/auth.module.scss';

const Signup = ({ setSubmit }) => {
  const {
    authDispatch,
    authState: {
      auth: { loading, data },
    },
  } = useContext(GlobalContext);

  const displaySuccess = () => data && (
  <div className={styles.sucess}>
    <p>{data.message}</p>
  </div>
  );

  const onSubmit = async (e) => {
    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);

    // NAME USED FOR USERS PROFILE
    let firstName = '';
    let lastName = '';

    // extracting first name and last name
    if (e.name.trim().split(' ').length < 2) {
      firstName = e.name;
      lastName = e.name;
    } else {
      [firstName, lastName] = e.name.trim().split(' ');
    }

    register({
      email: e.email,
      firstName,
      lastName,
      password: e.password,
      confirmPassword: e.confirmPassword,
    })(authDispatch);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid Email').required('Required'),
        name: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('Required'),
        password: Yup.string()
          .min(6, 'Password is too short (Minimum of 6 characters)')
          .required('Required'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords must match',
        ),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group login-input">
            <div className="mb-3">
              <span className={`${styles.inputLabel} form-label`}>
                Email Address
              </span>
              <InputField
                name="email"
                type="email"
                textStyle={styles.fieldInput}
                alertStyle={styles.errorText}
              />
            </div>
            <div className="mb-3">
              <span className={`${styles.inputLabel} form-label`}>
                Full Name
              </span>
              <InputField
                name="name"
                type="text"
                textStyle={styles.fieldInput}
                alertStyle={styles.errorText}
              />
            </div>
            <div className="mb-3">
              <span className={`${styles.inputLabel} form-label`}>
                Password
              </span>
              <InputField
                name="password"
                type="password"
                textStyle={styles.fieldInput}
                alertStyle={styles.errorText}
              />
            </div>
            <div className="mb-3">
              <span className={`${styles.inputLabel} form-label`}>
                Confirm Password
              </span>
              <InputField
                name="confirmPassword"
                type="password"
                textStyle={styles.fieldInput}
                alertStyle={styles.errorText}
              />
            </div>
          </div>
          {displaySuccess()}
          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
