import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import login from '../../../contexts/actions/auth/login';
import { GlobalContext } from '../../../contexts/provider';
import { InputField } from '../../TextField';
import styles from '../../../styles/auth/auth.module.scss';
import updateProfileJSON from '../../../contexts/actions/profile/updateProfileJSON';
import { successToast } from '../../../contexts/utils/toasts';

const Login = ({ setSubmit }) => {
  const {
    authDispatch,
    profileDispatch,
    authState: {
      auth: { loading },
    },
  } = useContext(GlobalContext);

  const onSubmit = async (e) => {
    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);

    login({
      email: e.email,
      password: e.password,
    })(authDispatch).then((res) => {
      if (res?.user.isDeactivated === true) {
        updateProfileJSON(
          res.user._id,
          JSON.stringify({ isDeactivated: false }),
        )(profileDispatch).then(() => successToast('successfully activated your account'));
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid Email').required('Required'),
        password: Yup.string().required('Required'),
      })}
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
                Password
              </span>
              <InputField
                name="password"
                type="password"
                textStyle={styles.fieldInput}
                alertStyle={styles.errorText}
              />
            </div>
          </div>
          <p className={styles.forgotPassword}>
            <a href="#">Forgot Password?</a>
          </p>
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
