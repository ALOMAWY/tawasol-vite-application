import React from "react";
import { formatDate } from "../../utils";
import { connect } from "react-redux";

const Educations = ({ profile, deleteEducation }) => {
  const educations = profile.education.map((edu) => (
    <div className="education" key={edu._id}>
      <div>
        <p>
          &#127891; {edu.current ? "Studies" : "Studied"} <b>{edu.degree}</b> Of{" "}
          <b>{edu.fieldofstudy}</b> At <b>{edu.school}</b>
        </p>
        <small>
          From {formatDate(edu.from)} To{" "}
          {edu.current ? "Current" : formatDate(edu.to)}
        </small>
      </div>
      {deleteEducation !== undefined ? (
        <a href="#!" onClick={() => deleteEducation(edu._id)}>
          <i className="fas fa-solid fa-trash"></i>
        </a>
      ) : null}
    </div>
  ));
  return (
    <div className="styled-list">
      {educations.length ? (
        educations
      ) : (
        <p
          style={{
            textAlign: "center",
          }}
        >
          No Items
        </p>
      )}
    </div>
  );
};

export default connect(null)(Educations);
