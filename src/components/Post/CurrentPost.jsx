import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeComment } from "../../redux/modules/posts";
import defaultImage from "../../assets/default.png";
import styled from "styled-components";
import { formatDate, getProfileImage } from "../../utils";
import { Link } from "react-router-dom";
import { PostLayout } from "../styledComponents";

const CurrentPost = ({ post: { user, text, comments, date, name, likes } }) => {
  const [image, setImage] = useState("");

  const onError = () => {
    setImage(defaultImage);
  };

  useEffect(() => {
    setImage(getProfileImage(user));
  }, [user]);

  return (
    <>
      <PostLayout>
        <div className="user-details">
          <Link to={`/profile/${user}`}>
            <img src={image} onError={onError} alt="user_logo" />
            <p>{name}</p>
          </Link>
        </div>

        <div className="comment">
          <div className="comment-data">
            <p className="comment">{text}</p>
            <p className="date">
              Posted At <strong>{formatDate(date)}</strong>
            </p>
          </div>
        </div>
      </PostLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  users: state.users,
});
export default connect(mapStateToProps, {
  removeComment,
})(CurrentPost);
