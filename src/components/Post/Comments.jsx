import React, { useEffect, useState } from "react";
import CurrentPost from "./CurrentPost.jsx";
import CommentForm from "./CommentForm.jsx";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/modules/posts";
import { connect } from "react-redux";
import Comment from "./Comment";

const Comments = ({ posts: { post, loading }, getPost }) => {
  let { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? null : (
    <div>
      <CurrentPost post={post} />
      <CommentForm id={id} />

      <div>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} post={post} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({ posts: state.posts });
export default connect(mapStateToProps, { getPost })(Comments);
