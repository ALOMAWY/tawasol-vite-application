import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faGear,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { getProfileDetails } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImage from "../assets/default.png";

const SidebarElement = styled.section.attrs((props) => ({
  isShowing: undefined,
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 3rem;
  height: 100%;
  background: #0d6efd;
  padding: 3rem;
  padding-right: 7rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: calc(100% - (6rem - 2px));
    background: #ffffff;
    width: 6rem;
    height: 100%;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  }

  @media (max-width: 865px) {
    flex-direction: row;
    width: 100%;
    height: fit-content;
    padding: 1rem;
    justify-content: space-evenly;
    position: fixed;
    z-index: 10;
    top: ${(props) =>
      props.$isShowing ? `calc(100% - ${props.$sideBarHeight}px)` : "100%"};

    &::before {
      content: "";
      display: none;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #f8f9fa;
  font-size: 1.3rem;

  i {
    color: white;
  }
`;

const Sidebar = ({ users: { user }, getProfileDetails }) => {
  const [mobileScreen, setMobileScreen] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);

  const [isShowing, setIsShowing] = useState(false);

  const [image, setImage] = useState("");

  const [errored, setErrored] = useState(false);

  const sideBarRef = useRef(null);

  const [sideBarHeight, setSideBarHeight] = useState(0);

  const onError = () => {
    setImage(defaultImage);
    if (!errored) {
      setErrored(true);
    }
  };

  useEffect(() => {
    const updateScreenSize = () => {
      const width = document.documentElement.clientWidth;
      setMobileScreen(width <= 865 ? true : false);

      getProfileDetails();

      if (user) {
        setImage(getProfileImage(user._id));
      }
    };

    const updateSidebarStatus = () => {
      if (lastScrollY < window.scrollY) {
        setLastScrollY(window.scrollY);
        setIsShowing(false);
      } else {
        setIsShowing(true);
      }
    };

    const updateSidebarHeight = () => {
      setSideBarHeight(sideBarRef.current.offsetHeight);
    };

    updateSidebarHeight();

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize, updateSidebarHeight);

    window.addEventListener("scroll", updateSidebarStatus);

    if (
      document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      setIsShowing(true);
    }

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, [lastScrollY, getProfileDetails, user]);

  return (
    <SidebarElement
      $isShowing={isShowing}
      $sideBarHeight={sideBarHeight}
      ref={sideBarRef}
    >
      <StyledLink to={"/home"}>
        {mobileScreen ? <FontAwesomeIcon icon={faHouse} /> : "Home"}
      </StyledLink>
      <StyledLink to={"/posts"}>
        {mobileScreen ? <FontAwesomeIcon icon={faEarthAsia} /> : "Posts"}
      </StyledLink>
      <StyledLink to={"/peoples"}>
        {mobileScreen ? <FontAwesomeIcon icon={faUsers} /> : "Peoples"}
      </StyledLink>
      <StyledLink to={"/settings"}>
        {mobileScreen ? <FontAwesomeIcon icon={faGear} /> : "Settings"}
      </StyledLink>

      {mobileScreen ? (
        <StyledLink to={"/home"}>
          <img
            src={image}
            style={{
              width: "45px",
              height: "45px",
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 0 15px #000",
            }}
            onError={onError}
            alt="profile"
          />
        </StyledLink>
      ) : (
        <StyledLink style={{ margin: "auto 0 50px -20px" }} to={"/home"}>
          <img
            src={image}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 0 15px #000",
            }}
            onError={onError}
            alt="profile"
          />
        </StyledLink>
      )}
    </SidebarElement>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getProfileDetails })(Sidebar);
