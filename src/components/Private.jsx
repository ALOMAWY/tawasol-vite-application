import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const Page = styled.section`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 865px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  margin-left: ${(props) => props.$sidebarWidth || 0}px;
  width: calc(100% - ${(props) => props.$sidebarWidth || 0}px);
  transition: margin-left 0.3s ease;
  height: 100%;
`;

const Private = ({
  components: Conponents,
  users: { loading, isAuthenticated },
}) => {
  const sideBarRef = useRef(null);

  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      handleResize();
    }, 500);

    const handleResize = () => {
      if (sideBarRef.current) {
        setSidebarWidth(sideBarRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Page>
      <Fragment>
        {loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Fragment>
            <div style={{ position: "fixed", height: "100%" }} ref={sideBarRef}>
              <Sidebar />
            </div>
            <ContentWrapper $sidebarWidth={sidebarWidth}>
              <Conponents />
            </ContentWrapper>
          </Fragment>
        ) : (
          <Navigate to="/login" />
        )}
      </Fragment>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps)(Private);
