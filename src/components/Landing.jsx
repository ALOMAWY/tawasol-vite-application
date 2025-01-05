import React, { Fragment } from "react";

import { Link, Navigate } from "react-router-dom";

import styled from "styled-components";
import Title from "./LandingTitles";
import { connect } from "react-redux";

// export default App;

const Section = styled.section`
  background-color: #0d6efd;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Header = styled.h1`
  text-align: center;
  background: black;
  color: #fff;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  font-size: 3rem;
`;

const TitleHolder = styled.div`
  margin-top: 2rem;
  font-size: 1rem;
`;

const Button = styled(Link)`
  text-align: center;
  padding: 15px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  border: 2px solid #fff;
  background: #fff;
  border-radius: 15px;
  width: 150px;
  display: block;
  margin: auto;
  margin-bottom: 1rem;

  &:hover {
    filter: brightness(80%);
  }
`;

const ContentHolder = styled.div`
  margin: auto;
  width: 100%;
`;

const Landing = ({ users: { isAuthenticated } }) => {
  if (isAuthenticated) return <Navigate to="/home" />;
  return (
    <Section>
      <ContentHolder>
        <Header>
          TawaSol
          <TitleHolder>
            <Title />
          </TitleHolder>
        </Header>
        {!isAuthenticated ? (
          <Fragment>
            <Button to="/register" className="btn btn-light w-25 m-auto">
              Sign Up
            </Button>
            <Button to="/login" className="btn btn-light w-25 m-auto">
              Log In
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button to="/home" className="btn btn-light w-25 m-auto">
              Go To Profile
            </Button>
            <Button to="/posts" className="btn btn-light w-25 m-auto">
              See All Posts
            </Button>
          </Fragment>
        )}
      </ContentHolder>
    </Section>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps)(Landing);
