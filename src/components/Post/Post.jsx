import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addLike,
  getPosts,
  removeLike,
  removePost,
} from "../../redux/modules/posts";
import defaultImage from "../../assets/default.png";
import { formatDate, getProfileImage } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { PostLayout } from "../styledComponents";

const Post = ({
  addLike,
  removeLike,
  removePost,
  users,
  post: { _id, user, text, comments, date, name, likes },
}) => {
  const [image, setImage] = useState("");

  const [liked, setLiked] = useState(false);

  const [likesNumber, setLikeNumber] = useState(0);

  const onError = () => {
    setImage(defaultImage);
  };

  useEffect(() => {
    setImage(getProfileImage(user));

    likes.map((like) => {
      return like.user === users.user._id ? setLiked(true) : null;
    });

    setLikeNumber(likes.length);
  }, [user, likes]);

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
          <div className="comment-info">
            <button
              type="button"
              onClick={() => {
                if (!liked) {
                  addLike(_id);

                  setLiked(true);

                  setLikeNumber(likesNumber + 1);
                } else {
                  removeLike(_id);

                  setLiked(false);

                  setLikeNumber(likesNumber - 1);
                }
              }}
              className={`like ${liked ? "im-liked" : ""}`}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              {likesNumber > 0 ? likesNumber : ""}
            </button>
            <Link to={`/posts/${_id}`} className="comments">
              Comments <span>{comments.length ? comments.length : ""}</span>
            </Link>
          </div>
        </div>
        <Fragment>
          {user === users.user._id ? (
            <div className="delete-post">
              <button
                type="button"
                onClick={() => {
                  removePost(_id);
                }}
                className="delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : null}
        </Fragment>
      </PostLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  users: state.users,
});
export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  removePost,
})(Post);
