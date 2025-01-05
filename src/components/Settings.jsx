import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteAccount } from "../redux/modules/profiles";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";

const Options = styled.ul`
  margin: auto;
    width: fit-content;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
}
`;

const StyledLink = styled(Link)`
  display: block;
  width: fit-content;
  margin: 1rem auto;
  padding: 1rem;
  color: #fff;
  border-radius: 1rem;
`;

const StyledButton = styled.button`
  display: block;
  width: fit-content;
  margin: 1rem auto;
  padding: 1rem;
  color: #fff;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
`;

const Settings = ({ deleteAccount, logout }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <Options>
        <li>
          <p>Update Your Profile Information.</p>
          <StyledLink style={{ background: "#0056ff" }} to="/edit-profile">
            Edit Account
          </StyledLink>
        </li>

        <li>
          <p>
            This Well Completely Delete Your Account And Remove Your Data From
            <strong> TawaSol App</strong>
          </p>
          <StyledButton
            style={{ background: "#dc3545" }}
            onClick={() => {
              deleteAccount();
              logout();
            }}
          >
            Delete Account
          </StyledButton>
        </li>
      </Options>
    </div>
  );
};

export default connect(null, { deleteAccount, logout })(Settings);
