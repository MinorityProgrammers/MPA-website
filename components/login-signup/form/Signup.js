import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/provider";
import { register } from "../../../contexts/actions/auth/register";
import TextField from "../../TextField";
import styles from "./form.module.css";

const Signup = ({ setSubmit }) => {
  const {
    authDispatch,
    authState: {
      auth: { loading, data },
    },
  } = useContext(GlobalContext);

  const displaySuccess = () => {
    return (
      data && (
        <div className={styles.sucess}>
          <p>{data.message}</p>
        </div>
      )
    );
  };

  const onSubmit = async (e) => {
    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);

    let firstName = "";
    let lastName = "";

    if (e.name.trim().split(" ").length < 2) {
      firstName = e.name;
      lastName = e.name;
    } else {
      firstName = e.name.trim().split(" ")[0];
      lastName = e.name.trim().split(" ")[1];
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
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid Email").required("Required"),
          name: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Required"),
          password: Yup.string()
            .min(6, "Password is too short (Minimum of 6 characters)")
            .required("Required"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
        })}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              alertStyle={styles.alert}
            />
            <TextField
              label="Full Name"
              name="name"
              type="text"
              alertStyle={styles.alert}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              alertStyle={styles.alert}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              alertStyle={styles.alert}
            />
            {displaySuccess()}
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
