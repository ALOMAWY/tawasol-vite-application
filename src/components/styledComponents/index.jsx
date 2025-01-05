import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 35%;
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 1px 1px 21px -3px #000000d9;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 90%;
    border: none;
    outline: none;
    border: 1px solid #6c757d50;
    padding: 0.7rem;
    font-size: 1rem;
    color: #212529;
    background: #f8f9fa;
  }

  textarea {
    width: 90%;
    height: 100px;
    border: none;
    outline: none;
    border: 1px solid #6c757d50;
    padding: 0.7rem;
    font-size: 1rem;
    color: #212529;
  }

  select {
    width: 90%;
    border: none;
    outline: none;
    border: 1px solid #6c757d50;
    padding: 0.7rem;
    font-size: 1rem;
    color: #212529;
  }

  input[type="submit"] {
    border: none;
    padding: 1rem 1.7rem;
    background: #0d6efd;
    font-size: 1.2rem;
    color: #f8f9fa;
    margin-top: 2rem;
    border-radius: 0.6rem;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  p {
    text-transform: capitalize;
    margin-top: 1rem;

    a {
      color: #0d6efd;
      font-weight: bold;
    }
  }

  @media (max-width: 1500px) {
    width: 50%;
  }
  @media (max-width: 1120px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const PostLayout = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 1.4rem auto;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid #cac9c9;

  div.user-details {
    text-align: center;
    width: 13%;
    a {
      display: block;
    }
    img {
      width: 65%;
      border-radius: 20%;
      aspect-ratio: 1 / 1;
      box-shadow: 0 0 13px;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    p {
      text-transform: capitalize;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }

  div.comment {
    padding: 1rem;
    flex: 1;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;

    div.comment-data {
      p.comment {
        font-size: 1.3rem;
        font-weight: normal;
      }

      p.date {
        color: #777777;
        margin-top: 0.4rem;
      }
    }

    div.comment-info {
      display: flex;
      gap: 3%;
      align-items: center;

      button {
        padding: 0.3rem 1rem;
        border: none;
        background: transparent;
        font-size: 1.3rem;

        &.im-liked {
          color: #0d6efd;
        }
      }

      a {
        background: #0d6efd;
        padding: 0.4rem 1rem;
        color: #fff;
        border-radius: 7px;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  div.delete-post {
    display: flex;
    button {
      background: #0d6efd;
      padding: 0.6rem;
      border-radius: 12%;
      margin: auto;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
    }
  }

  @media (max-width: 1400px) {
    margin: 1rem;
    div.user-details {
      width: 18%;

      img {
        width: 65%;
      }
    }

    div.comment {
      gap: 1rem;
      div.comment-data {
        padding: 1rem;
        p.comment {
        }

        p.date {
        }
      }

      div.comment-info {
        button {
          &.im-liked {
          }
        }

        a {
          &:hover {
          }
        }
      }
    }

    div.delete-post {
      button {
      }
    }
  }

  @media (max-width: 1100px) {
    margin: 1rem;
    div.user-details {
      width: 18%;

      img {
        width: 70%;
      }
    }

    div.comment {
      gap: 1rem;
      div.comment-data {
        padding: 1rem;
        p.comment {
        }

        p.date {
        }
      }

      div.comment-info {
        button {
          &.im-liked {
          }
        }

        a {
          &:hover {
          }
        }
      }
    }

    div.delete-post {
      button {
      }
    }
  }

  @media (max-width: 570px) {
    div.user-details {
      width: 30%;
    }
  }
`;
