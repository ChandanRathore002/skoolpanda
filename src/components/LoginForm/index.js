import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { Image, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import Error from './Error';
import Input from '../Input';
import Logo from '../../images/logo.png';

import { authenticate } from '../../redux/auth';

import './login.scss';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter a password'),
  username: Yup.string()
    .required('Please enter a user name'),
})

const LoginForm = (props) => {
  const [loginError, setLoginError] = useState('');
  const [showAuthError, setShowAuthError] = useState(false);
  let history = useHistory();

  const handleSubmit = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    const { dispatch } = props;

    dispatch(authenticate(values.username, values.password))
    .then(({apiresponse: response}) => {
      const {
        message,
        type
      } = response;

      if (type === "ERROR") {
        console.log("INSINDE IF :");
        setLoginError(message);
        setShowAuthError(true);
        return;
      }

      setShowAuthError(false);
      resetForm();
      setSubmitting(false);
      history.push("/home");
      // navigate to other page
    })
    .catch(error => {
      console.log("LOGIN ERROR: ", error);
    });
  };

  return (
    <div className="login-form">
      <Formik
        initialValues={{ username: '', password: ''  }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="logo-col">
              <Image src={Logo} />
            </div>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Input
                id="username"
                type="username"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={touched.username && errors.username ? 'form-control has-error' : 'form-control'}
              />
              <Error touched={touched.username} message={errors.username} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={touched.password && errors.password ? 'form-control has-error' : 'form-control'}
              />
              <Error touched={touched.password} message={errors.password} />
            </Form.Group>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Sign in
            </button>
								<small>Version: {process.env.REACT_APP_GIT_VERSION} Environment: {process.env.NODE_ENV}</small> 
            {showAuthError && <div className="error-message text-left w-100 mt-3">
              {loginError}
            </div>}
          </form>
        )}
      </Formik>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    isAuthVerified: state.auth.isAuthVerified,
    isLoading: state.auth.isLoading
  };
}

export default connect(mapStateToProps)(LoginForm);
