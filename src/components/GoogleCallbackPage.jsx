import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { registerOnTheerdParty } from "../redux/modules/users";

const GoogleCallbackPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerOnTheerdParty());
  }, [dispatch]);
  return <div>Processing Your Google Login ...</div>;
};

export default GoogleCallbackPage;
