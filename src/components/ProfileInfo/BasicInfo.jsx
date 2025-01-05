import React from "react";

import { styled } from "styled-components";

const Basicinfo = styled.ul`
  li {
    padding: 1rem;
    margin: 0.5rem;
    background: #ebebeb;
    border-radius: 10px;
  }
`;

const Basicinfos = ({ profile }) => {
  return (
    <Basicinfo>
      <li>Bio : {profile.bio}</li>
      <li>&#127759; Lives In {profile.location}</li>
      <li>&#x1f3e0; From {profile.country}</li>
      <li style={{ lineHeight: 2 }}>
        {profile.skills.map((skill) => (
          <span key={skill}>
            &#10004; {skill}
            <br />
          </span>
        ))}
      </li>
    </Basicinfo>
  );
};

export default Basicinfos;
