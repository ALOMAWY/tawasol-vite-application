import React, { Fragment, useEffect } from "react";

import { Link, Navigate, useParams } from "react-router-dom";

import styled from "styled-components";
import Title from "./LandingTitles";
import { connect, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { loadUser, registerOnTheerdParty } from "../redux/modules/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { setAuthToken } from "../utils";

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
  width: 170px;
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

const Landing = ({
  users: { user, isAuthenticated, loading },
  loadUser,
  registerOnTheerdParty,
}) => {
  const dispatch = useDispatch();

  if (isAuthenticated && user) return <Navigate to="/home" />;

  if (loading && !user) {
    loadUser();
    return <Spinner />;
  }

  useEffect(() => {
    registerOnTheerdParty();
  }, [dispatch]);

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
            <Button
              to="https://tawasol-server-fufp.onrender.com/api/auth/google"
              className="btn btn-light w-25 m-auto"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".4rem",
                fontSize: "1.4rem",
              }}
            >
              <div style={{ fontSize: "2rem" }}>
                <span style={{ color: "#4285f4" }}>G</span>
                <span style={{ color: "#ea4335" }}>o</span>
                <span style={{ color: "#fbbc05" }}>o</span>
                <span style={{ color: "#4285f4" }}>g</span>
                <span style={{ color: "#34a853" }}>l</span>
                <span style={{ color: "#ea4335" }}>e</span>
              </div>
            </Button>
            <Button
              to="https://tawasol-server-fufp.onrender.com/api/auth/facebook"
              className="btn btn-light w-25 m-auto"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".4rem",
                fontSize: "1.4rem",
                color: "#1877f2",
              }}
            >
              <FontAwesomeIcon icon={faFacebook} fontSize={40} />
              Facebook
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
export default connect(mapStateToProps, { loadUser, registerOnTheerdParty })(
  Landing
);
