import React, { useState } from "react";
import { addPost } from "../../redux/modules/posts";
import { connect } from "react-redux";
import styled from "styled-components";

const Form = styled.div`
  width: 90%;
  border: 1px solid #cac9c9;
  margin: 2rem auto;
  box-shadow: 0 0 10px 0px #a09d9d;

  h2 {
    text-align: center;
    margin: 1.3rem;
  }

  form {
    text-align: center;
  }

  textarea {
    width: 90%;
    padding: 1rem;
    height: fit-content;
    font-size: 1.3rem;
    resize: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  input {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border: none;
    background: #0d6efd;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 1rem;
    border-radius: 10px;
  }
`;

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addPost({ text });

    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Form>
      <h2>Create Post </h2>
      <hr />
      <form onSubmit={onSubmit}>
        <textarea
          name="text"
          placeholder="What's On Your Mind?"
          value={text}
          onChange={onChange}
          required
        />
        <br />
        <input type="submit" value={"Post"} />
      </form>
    </Form>
  );
};

export default connect(null, { addPost })(PostForm);
