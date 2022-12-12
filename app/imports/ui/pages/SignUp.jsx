import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, BoolField, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const schema = new SimpleSchema({
    email: {
      type: String,
      regEx: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, //eslint-disable-line
    },
    password: String,
    hasPass: {
      type: Boolean,
      required: false,
    },
    licensePlate: {
      type: String,
      max: 7,
      regEx: /[A-Z]{3} [0-9]{3}/,
    },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, hasPass, licensePlate } = doc;
    Accounts.createUser({ email: email, username: email, password, profile: { hasPass: hasPass, licensePlate: licensePlate } }, (err) => {
      if (err) {
        console.log(err);
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container fluid id="signup-page" className="py-3 background-image3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center text-white">
            <h2 className="bg-light-green p-0 m-0">Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body className="bg-light-green text-white">
                <TextField id="signup-form-email" name="email" placeholder="E-mail address" />
                <TextField id="signup-form-licensePlate" name="licensePlate" placeholder="ABC 123" />
                <TextField id="signup-form-password" name="password" placeholder="Password" type="password" />
                <span className="me-3">Have a parking pass?</span>
                <BoolField id="signup-form-hasPass" name="hasPass" className="ps-5" />
                <ErrorsField />
                <SubmitField id="signup-form-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="success">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
