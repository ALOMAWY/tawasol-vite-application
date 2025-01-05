import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUsersProfiles } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default.png";

const PeoplesBox = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  justify-content: center;
`;

const PeopleBox = styled.div`
  padding: 0.6rem;
  border-radius: 1rem;
  background: #eee;
  height: fit-content;
  text-align: center;
  transition: 0.1s;
  box-shadow: -4px 4px 16px -5px #000;

  img {
    aspect-ratio: 1 / 1;
    width: 75%;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 0 13px;
    margin: 1rem;
  }

  h4 {
    font-size: 1.3rem;
    margin: 1rem 0;
    text-transform: capitalize;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const Peoples = ({
  getUsersProfiles,
  profiles: { profiles, loading, error },
  users: { isAuthenticated, user },
}) => {
  useEffect(() => {
    getUsersProfiles();
  }, [getUsersProfiles, isAuthenticated]);

  if (loading) return <Spinner />;
  if (error) return <p>Failed Load To Profiles.</p>;

  return (
    <PeoplesBox key={profiles}>
      {!profiles
        ? null
        : profiles.map((profile) => (
            <Link key={profile.user._id} to={`/profile/${profile.user._id}`}>
              <Member profile={profile} />
            </Link>
          ))}
    </PeoplesBox>
  );
};

const Member = ({ profile }) => {
  const [errored, setErrored] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(getProfileImage(profile.user._id));
  }, [getProfileImage, profile.user._id]);

  const onError = () => {
    if (!errored) {
      setErrored(errored);
      setImage(defaultImage);
    }
  };
  return (
    <PeopleBox key={profile.user._id}>
      <img src={image} onError={onError} alt="User" />
      <h4>{profile.user.name}</h4>
      <p>{profile.status}</p>
    </PeopleBox>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  users: state.users,
});

export default connect(mapStateToProps, { getUsersProfiles })(Peoples);
