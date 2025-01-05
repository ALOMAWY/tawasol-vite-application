import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { connect } from "react-redux";

import {
  deleteEducation,
  deleteExperience,
  getProfileDetails,
} from "../redux/modules/profiles";

import { Link, Navigate } from "react-router-dom";

import defaultImage from "../assets/default.png";

import Basicinfos from "./ProfileInfo/BasicInfo";

import Educations from "./ProfileInfo/Educations";

import Experiences from "./ProfileInfo/Experience";

import { getProfileImage } from "../utils";

import Spinner from "./Spinner";

const ProfilePage = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 4rem;

  .user-details {
    flex-basis: 100%;
    display: flex;
    gap: 3rem;
    padding: 0 5rem;

    div {
      flex: 1;

      .styled-list {
        .experience,
        .education {
          padding: 0.5rem;
          margin-bottom: 0.4rem;
          background: #ebebeb;
          border-radius: 1rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
      }
    }

    a {
      color: #fff;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 1200px) {
    .user-details {
      flex-direction: column;
      gap: 5rem;
      padding: 1rem;
      padding-bottom: 2rem;
    }
  }
`;

const Profile = styled.div`
  width: calc(100% - 5rem);
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1500px) {
    width: calc(100% - 1.5rem);
    gap: 1rem;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;
const UserInfo = styled.div`
  width: 60%;
  text-align: center;

  img {
    box-shadow: 5px 5px 20px #00000050;
    border-radius: 2.3rem;
    width: 70%;
    aspect-ratio: 1 / 1;
    object-fit: fill;
  }

  h1 {
    font-size: 2rem;
    text-transform: uppercase;
    word-spacing: 0.5rem;
    margin-top: 1.2rem;
    width: 80%;
    margin: 1.2rem auto;
  }

  @media (max-width: 1580px) {
    img {
      width: 80%;
    }
  }

  @media (max-width: 1280px) {
    img {
      width: 90%;
    }
  }

  @media (max-width: 1200px) {
    img {
      width: 100%;
    }
  }
`;

const BasicInfo = styled.section`
  width: 90%;
`;

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0.5rem;
  background: #ebebeb;
  border-radius: 10px;
  padding: 0.5rem;
  a {
    color: #00000080;
    padding: 0.4rem;
    transation: 0.1s;
    &:hover {
      color: #000;
    }
  }

  @media (max-width: 865px) {
    gap: 0;
    justify-content: space-evenly;
  }

  @media (max-width: 500px) {
    a {
      font-size: 0.8rem;
    }
  }
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Home = ({
  getProfileDetails,
  deleteExperience,
  deleteEducation,
  profiles: { profile, loading, error },
  users: { user, isAuthenticated },
}) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      getProfileDetails();

      if (user) setImage(getProfileImage(user._id));
    }
  }, [getProfileDetails, isAuthenticated, user]);

  const onError = () => {
    setImage(defaultImage);
  };

  if (loading) {
    return <Spinner />;
  }

  if (loading || error) {
    return <Navigate to="/create-profile" />;
  }
  return !profile ? null : (
    <ProfilePage>
      <Profile>
        <UserInfo>
          <img src={image} alt="Profile" onError={onError} />
          <h1>{profile.user.name}</h1>
        </UserInfo>
        <BasicInfo style={{ width: "100%" }}>
          <Basicinfos profile={profile} />
          <SocialBox>
            {Object.keys(profile.social).filter(
              (media) => profile.social[media] !== ""
            ).length ? (
              Object.keys(profile.social)
                .filter((media) => profile.social[media] !== "")
                .map((media) => (
                  <a
                    key={media}
                    rel="noreferrer"
                    target="_blank"
                    href={profile.social[media]}
                  >
                    <i className={`fab fa-${media} fa-2x`}></i>
                  </a>
                ))
            ) : (
              <p style={{ padding: 8 }}>No Any Social Accounts !</p>
            )}
          </SocialBox>
        </BasicInfo>
      </Profile>
      <div className="user-details">
        <div className="educations">
          <DetailsHeader>
            <h2>Educations</h2>
            <Link to="/add-education">
              <button>
                <i className="fas fa-solid fa-plus"></i>
              </button>
            </Link>
          </DetailsHeader>
          <Educations profile={profile} deleteEducation={deleteEducation} />
        </div>
        <div className="experieces">
          <DetailsHeader>
            <h2>Experiences</h2>
            <Link to="/add-experience">
              <button>
                <i className="fas fa-solid fa-plus"></i>
              </button>
            </Link>
          </DetailsHeader>
          <Experiences profile={profile} deleteExperience={deleteExperience} />
        </div>
      </div>
    </ProfilePage>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  users: state.users,
});

export default connect(mapStateToProps, {
  getProfileDetails,
  deleteExperience,
  deleteEducation,
})(Home);
