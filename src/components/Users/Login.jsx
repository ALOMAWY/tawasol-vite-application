import React, { useState } from "react";

import { connect, useDispatch } from "react-redux";

import { Link, Navigate } from "react-router-dom";

import PropTypes from "prop-types";

import { login } from "../../redux/modules/users";

import { showAlertMessage } from "../../redux/modules/alerts";

import styled from "styled-components";

import { StyledForm } from "../styledComponents";
import Private from "../Private";
import Home from "../Home";

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d6efd;
  width: 100%;
  height: 100%;
`;

const Login = ({ isAuthenticated, login, showAlertMessage }) => {
  const [formDate, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formDate;

  const onChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated)
    return (
      <Navigate to={"/home"}>
        <Private components={Home} />
      </Navigate>
    );
  return (
    <Section>
      <StyledForm onSubmit={onSubmit}>
        <h3>Sign In</h3>

        <input
          type="email"
          name="email"
          align="center"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          align="center"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />

        <input type="submit" value="Send" />

        <p align="center">
          I Do Not Have Account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </StyledForm>
    </Section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  showAlertMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users?.isAuthenticated || false,
});

export default connect(mapStateToProps, { showAlertMessage, login })(Login);
