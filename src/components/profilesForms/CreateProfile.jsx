import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProfileDetails,
  createProfile,
  updateProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";
import { StyledForm } from "../styledComponents/index.jsx";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils";
import { loadUser } from "../../redux/modules/users";
import store from "../../redux/store";

const HomePage = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const SectionHeader = styled.h1`
  font-size: 3rem;
  letter-spacing: 1px;
  margin: 1.5rem;
`;

const StyledProfileForm = styled(StyledForm)`
  background: #0d6efd;
  text-align: start;
  gap: 0.7rem;
  height: 80%;
  overflow-y: scroll;
  border-radius: 2rem 0 0 2rem;
  padding: 1rem;
  border: 1rem solid #0d6efd;

  input[type="submit"] {
    background: #f8f9fa;
    font-size: 1.2rem;
    color: #0d6efd;
    margin-top: 2rem;
    border-radius: 0.6rem;
    cursor: pointer;
  }
`;

const InputTitle = styled.h1`
  width: 100%;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  input,
  input[type="submit"],
  select,
  textarea {
    width: 100%;
    margin-top: 0px;
  }
`;

const SocialNetworkBtn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  button {
    padding: 0.56rem;
    display: block;
    outline: none;
    border: none;
    &:hover {
      outline: none;
      border: none;
      opacity: 0.9;
    }
  }

  span {
    color: #f8f9fa;
  }
`;

const CreateProfile = ({
  getProfileDetails,
  createProfile,
  uploadProfileImage,
  profiles: { profile, loading },
}) => {
  const initialState = {
    company: "",
    website: "",
    country: "",
    status: "",
    skills: "",
    location: "",
    bio: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    github: "",
  };

  const [formDate, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialStatus] = useState(false);

  const navigate = useNavigate();

  const [account, setAccount] = useState();

  const token = localStorage.getItem("token");

  const isAuthenticated = store.getState().users.isAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      if (token) setAuthToken(token);
    }

    if (profile) {
      setAccount(true);
    } else {
      getProfileDetails();
    }
  }, [profile, isAuthenticated, getProfileDetails, token]);

  const { status } = formDate;

  const onChangeFile = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No File Selected");
      alert("no Selected file");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    if (data) uploadProfileImage(data);
  };

  const onChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formDate, navigate);
  };

  const goToTheAccount = () => navigate("/home");
  return (
    <HomePage>
      <SectionHeader> Create Profile</SectionHeader>

      <StyledProfileForm onSubmit={onSubmit}>
        {account ? (
          <FormGroup>
            <InputTitle>You Have Accounts ?</InputTitle>
            <button onClick={goToTheAccount}>Alraedy I have an account</button>
          </FormGroup>
        ) : (
          <></>
        )}
        <InputTitle>Basic information</InputTitle>
        <FormGroup>
          <select name="status" value={status} onChange={onChange}>
            <option value="">Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="System Administrator">System Administrator</option>
            <option value="Marketing Specialist">Marketing Specialist</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Consultant">Consultant</option>
            <option value="Technical Writer">Technical Writer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Database Administrator">
              Database Administrator
            </option>
            <option value="Cybersecurity Specialist">
              Cybersecurity Specialist
            </option>
            <option value="Network Engineer">Network Engineer</option>
            <option value="Machine Learning Engineer">
              Machine Learning Engineer
            </option>
            <option value="Cloud Architect">Cloud Architect</option>
            <option value="Full-Stack Developer">Full-Stack Developer</option>
          </select>
        </FormGroup>
        <FormGroup>
          <InputTitle>Chosse your profile image</InputTitle>
          <input type="file" accept="image/*" onChange={onChangeFile} />
        </FormGroup>

        <FormGroup>
          <InputTitle>Your information</InputTitle>
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={onChange}
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            onChange={onChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={onChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={onChange}
          />
          <input
            type="text"
            name="skills"
            placeholder="* Skills"
            onChange={onChange}
          />

          <textarea
            type="text"
            name="bio"
            placeholder="A Short Bio Of Yourself"
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <SocialNetworkBtn>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSocialStatus(!displaySocialInputs);
              }}
            >
              Social Network
            </button>
            <span>Optional</span>
          </SocialNetworkBtn>
          {displaySocialInputs ? (
            <Fragment>
              <InputTitle>Social Media Accounts</InputTitle>

              <input
                type="text"
                name="twitter"
                placeholder="Twitter URL"
                onChange={onChange}
              />
              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                onChange={onChange}
              />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                onChange={onChange}
              />
              <input
                type="text"
                name="github"
                placeholder="Github URL"
                onChange={onChange}
              />
              <input
                type="text"
                name="linkedin"
                placeholder="Linkedin URL"
                onChange={onChange}
              />
              <input
                type="text"
                name="youtube"
                placeholder="Youtube URL"
                onChange={onChange}
              />
            </Fragment>
          ) : (
            <></>
          )}
        </FormGroup>

        <FormGroup>
          <input
            type="submit"
            name="website"
            value="Send"
            placeholder="Website"
          />
        </FormGroup>
      </StyledProfileForm>
    </HomePage>
  );
};

const mapStateToProps = (state) => ({ profiles: state.profiles });

export default connect(mapStateToProps, {
  getProfileDetails,
  uploadProfileImage,
  updateProfile,
  createProfile,
  loadUser,
})(CreateProfile);
