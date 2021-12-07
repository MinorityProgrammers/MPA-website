import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { GlobalContext } from '../../../contexts/provider';
import { login } from '../../../contexts/actions/auth/login';
import TextField from '../../TextField';
import styles from './form.module.css';

const Login = function ({ setSubmit }) {
  const {
    authDispatch,
    authState: {
      auth: { loading, data },
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
    })(authDispatch);
  };

  return (
    <div className={styles.container}>
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
          <Form className={styles.form}>
            <TextField
              label="email address"
              name="email"
              type="email"
              alertStyle={styles.alert}
            />
            <TextField
              label="password"
              name="password"
              type="password"
              alertStyle={styles.alert}
            />
            <div className={styles.buttonContainer}>
              <p>
                <a href="#">Forgot Password?</a>
              </p>
              <button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
