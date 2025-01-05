import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../redux/modules/profiles";
import { StyledForm } from "../styledComponents/index.jsx";
import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const AddEducationForm = styled(StyledForm)`
  background: #0d6efd;

  label,
  h1 {
    color: #f8f9fa;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;

    label {
      font-size: 1.3rem;
      margin: 0 0 0.6rem 1.3rem;
    }
    input {
      width: 90%;
      padding: 0.7rem;
      margin: auto;
      border: 1px solid #6c757d50;
    }
  }

  div.current-state {
    display: flex;
    gap: 0.1rem;
    margin: 0 auto 0 1.3rem;

    label {
      font-size: 1.3rem;
    }
    input {
      width: 50px;
    }
  }

  hr {
    width: 100%;
    border: 1px solid #ffffff50;
    margin: 0.7rem;
  }

  .action-btns {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 2rem;
    width: 100%;

    input[type="submit"] {
      background: #f8f9fa;
      color: #0d6efd;
      margin: 0;
    }

    a {
      color: #f8f9fa;
      display: block;
      text-align: center;
    }
    input[type="submit"],
    a {
      width: 40%;
    }
  }
`;

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
  });



  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    addEducation(formData, navigate);

  };
  return (
    <Page>
      <AddEducationForm style={{ margin: "auto auto" }} onSubmit={onSubmit}>
        <h1>Add Education</h1>

        <input
          type="text"
          name="school"
          onChange={onChange}
          placeholder="* School"
        />
        <input
          type="text"
          name="degree"
          onChange={onChange}
          placeholder="* Degree Or Certificate"
        />
        <input
          type="text"
          name="fieldofstudy"
          onChange={onChange}
          placeholder="Field Of Study"
        />

        <hr />

        <div className="input-field">
          <label htmlFor="date">
            <b>From Date</b>
          </label>
          <input type="date" name="from" onChange={onChange} id="from" />
        </div>

        <hr />

        <div className="current-state">
          <input
            type="checkbox"
            name="current"
            onChange={onChange}
            id="current"
          />

          <label htmlFor="current">
            <b>Current UNV</b>
          </label>
        </div>

        <hr />

        <div className="input-field">
          <label htmlFor="to">
            <b>To Date</b>
          </label>
          <input type="date" name="to" onChange={onChange} id="to" />
        </div>

        <div className="action-btns">
          <input type="submit" value="Send" />
          <Link to={"/home"}>Go Back</Link>
        </div>
      </AddEducationForm>
    </Page>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
