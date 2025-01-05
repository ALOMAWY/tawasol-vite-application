import React, { Fragment } from "react";

import spinner from "../assets/spinner.gif";
import styled from "styled-components";

const StyledSpinner = styled.div`
  width: 100%;
  height: 100%;

  img {
    margin: auto;
    display: block;
  }
`;

const Spinner = () => {
  return (
    <Fragment>
      <StyledSpinner>
        <img src={spinner} alt="Loading..." />
      </StyledSpinner>
    </Fragment>
  );
};

export default Spinner;
