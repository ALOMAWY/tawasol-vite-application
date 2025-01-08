// import "bootstrap/dist/css/bootstrap.min.css";

// CSS
import "./App.css";
import styled from "styled-components";

// React JS
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react-alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Conponents
import Navbar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Register from "./components/Users/Register.jsx";
import Private from "./components/Private.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Users/Login.jsx";
import AddEducation from "./components/profilesForms/AddEducation.jsx";
import AddExperience from "./components/profilesForms/AddExperience.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import Posts from "./components/Post/Posts.jsx";
import EditProfile from "./components/profilesForms/EditProfile.jsx";
import CreateProfile from "./components/profilesForms/CreateProfile.jsx";
import Comments from "./components/Post/Comments.jsx";
import Peoples from "./components/Peoples.jsx";

// Redux
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { setAuthToken } from "./utils/index.js";
import { loadUser } from "./redux/modules/users.js";

// Alerts Setup

const options = {
  autoClose: 1000,
};
const Holder = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer {...options} />
        <>
          <Holder>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Landing />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/home"
                element={<Private components={Home} />}
              ></Route>
              <Route
                path="/create-profile"
                element={<Private components={CreateProfile} />}
              />
              <Route
                path="/edit-profile"
                element={<Private components={EditProfile} />}
              />
              <Route
                path="/add-education"
                element={<Private components={AddEducation} />}
              />
              <Route
                path="/add-experience"
                element={<Private components={AddExperience} />}
              />
              <Route
                path="/peoples"
                element={<Private components={Peoples} />}
              />
              <Route path="/posts" element={<Private components={Posts} />} />
              <Route
                path="/settings"
                element={<Private components={Settings} />}
              />
              <Route
                path="/profiles/:id"
                element={<Private components={Profile} />}
              />
              <Route
                path="/posts/:id"
                element={<Private components={Comments} />}
              />
            </Routes>
          </Holder>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
