import React from "react";
import { formatDate } from "../../utils";
import { connect } from "react-redux";

const Experiences = ({ profile, deleteExperience }) => {
  const experieces = profile.experience.map((exp) => (
    <div className="experience" key={exp._id}>
      <div>
        <p>
          &#128188; {exp.current ? "Works" : "Worked"} as <b>{exp.title}</b>
          At <b>{exp.company}</b>
        </p>
        <small>
          From {formatDate(exp.from)} To{" "}
          {exp.current ? "Current" : formatDate(exp.to)}
        </small>
      </div>
      {deleteExperience !== undefined ? (
        <a href="#!" onClick={() => deleteExperience(exp._id)}>
          <i className="fas fa-trash delete"></i>
        </a>
      ) : null}
    </div>
  ));

  return (
    <div className="styled-list">
      {experieces.length ? (
        experieces
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

export default connect(null)(Experiences);
