import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import styled from "styled-components";
import PostForm from "./PostForm";
import Post from "./Post";

const Page = styled.section`
  width: 100%;
`;



const Posts = ({ getPosts, posts: { post, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts, post]);

  return (
    <Page>
      <PostForm />
      <div>
        {posts.length ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p style={{ textAlign: "center" }}>No Posts Available</p>
        )}
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, {
  getPosts,
})(Posts);
