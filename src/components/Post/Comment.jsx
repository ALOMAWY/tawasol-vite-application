import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeComment } from "../../redux/modules/posts";
import defaultImage from "../../assets/default.png";
import styled from "styled-components";
import { formatDate, getProfileImage } from "../../utils";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostLayout } from "../styledComponents";

const Comment = ({
  post,
  comment: { text, date, name, user, _id },
  comment,
  users,
  removeComment,
}) => {
  const [image, setImage] = useState("");

  const onError = () => {
    setImage(defaultImage);
  };

  useEffect(() => {
    setImage(getProfileImage(user));
  }, [user, comment]);

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

        {user === users.user._id ? (
          <div className="delete-post">
            <button
              type="button"
              onClick={() => {
                removeComment(post._id, _id);
              }}
              className="delete"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ) : null}
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
})(Comment);
