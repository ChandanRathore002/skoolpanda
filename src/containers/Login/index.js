import React from 'react';
import { Container, Row } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';
import './login.scss';

const Login = () => (
  <div className="login-section">
    <Container>
      <Row>
        <LoginForm />
      </Row>
    </Container>
  </div>
);

export default Login;
