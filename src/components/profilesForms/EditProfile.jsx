import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProfileDetails,
  getProfileById,
  updateProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";
import { StyledForm } from "../styledComponents/index.jsx";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils";
import { loadUser } from "../../redux/modules/users";

import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const HomePage = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const SectionHeader = styled.h1`
  font-size: 2rem;
  letter-spacing: 1px;
  margin: 1.5rem;
  text-transform: uppercase;
`;

const StyledProfileForm = styled(StyledForm)`
  background: transparent;
  text-align: start;
  gap: 0.7rem;
  height: 80%;
  padding: 1rem;
  box-shadow: 0px 0px 0px;
  input[type="submit"] {
    // background: #f8f9fa;
    font-size: 1.2rem;
    color: #f8f9fa;
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
  justify-content: start;
  gap: 2rem;
  button {
    padding: 0.56rem;
    display: block;

    &:hover {
      opacity: 0.9;
    }
  }

  span {
    color: #0d6efd;
  }
`;

const EditProfile = ({
  updateProfile,
  uploadProfileImage,
  getProfileById,
  profiles: {},
  users: { user, isAuthenticated },
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

  const token = localStorage.getItem("token");

  const handleUserData = async () => {
    try {
      const fetchingData = await getProfileById(user._id);

      if (fetchingData) {
        setFormData({ ...fetchingData, ...fetchingData.social });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      if (token) {
        setAuthToken(token);
      } else {
        navigate("/");
      }
    }
    handleUserData();
  }, [user._id, isAuthenticated, token]);

  const { status } = formDate;

  const onChangeFile = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No File Selected");
      return;
    }

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      const data = new FormData();

      data.append("file", compressedFile);

      try {
        if (data) await uploadProfileImage(data);

        toast.success("Logo Is Uploaded");
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(`Error while compressing the image:`, error);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formDate, navigate);
  };
  return (
    <HomePage>
      <SectionHeader> Update Profile</SectionHeader>

      <StyledProfileForm onSubmit={onSubmit}>
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
            value={formDate.company}
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            onChange={onChange}
            value={formDate.website}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={onChange}
            value={formDate.location}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={onChange}
            value={formDate.country}
          />
          <input
            type="text"
            name="skills"
            placeholder="* Skills"
            onChange={onChange}
            value={formDate.skills}
          />

          <textarea
            type="text"
            name="bio"
            placeholder="A Short Bio Of Yourself"
            onChange={onChange}
            value={formDate.bio}
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
                value={formDate.twitter}
              />
              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                onChange={onChange}
                value={formDate.facebook}
              />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                onChange={onChange}
                value={formDate.instagram}
              />
              <input
                type="text"
                name="github"
                placeholder="Github URL"
                onChange={onChange}
                value={formDate.github}
              />
              <input
                type="text"
                name="linkedin"
                placeholder="Linkedin URL"
                onChange={onChange}
                value={formDate.linkedin}
              />
              <input
                type="text"
                name="youtube"
                placeholder="Youtube URL"
                onChange={onChange}
                value={formDate.youtube}
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
            value="Update"
            placeholder="Website"
          />
        </FormGroup>
      </StyledProfileForm>
    </HomePage>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  users: state.users,
});

export default connect(mapStateToProps, {
  getProfileDetails,
  uploadProfileImage,
  getProfileById,
  updateProfile,
  loadUser,
})(EditProfile);
