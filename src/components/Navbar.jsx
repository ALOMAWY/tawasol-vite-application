import { Fragment, useEffect } from "react";
import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import styled from "styled-components";
import { logout } from "../redux/modules/users";

const Nav = styled.nav`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem;
  box-shadow: 0px 0px 40px #00000030;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const LogoHolder = styled(Link)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Logo = styled.span`
  width: 25px;
  height: 25px;
  background: #0d6efd;
  border-radius: 50%;
  display: block;
  border: 3px solid #000;
`;

const LogoText = styled.h3`
  color: #212529;
  font-weight: bold;
  font-size: 2rem;
`;

const Button = styled(Link)`
  text-align: center;
  padding: 15px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  border: 2px solid #fff;
  background: #212529;
  border-radius: 15px;
  display: block;

  &:hover {
    opacity: 0.9;
  }
`;

const Navbar = ({ users:{ isAuthenticated}, logout }) => {
  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <Button onClick={logout} to={"/"}>
            Logout
          </Button>
        </li>
      </ul>
    </Fragment>
  );

  const unAuthLinks = (
    <Fragment>
      <ul>
        <li>
          <Button to={"/login"}>Login</Button>
        </li>
      </ul>
    </Fragment>
  );
  return (
    <Nav>
      <LogoHolder to="/">
        <LogoText>TawaSol</LogoText>
        <Logo />
      </LogoHolder>

      <Fragment>{isAuthenticated ? authLinks : unAuthLinks}</Fragment>
    </Nav>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { logout })(Navbar);
