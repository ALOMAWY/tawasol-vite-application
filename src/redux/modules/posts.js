import { api } from "../../utils";

const GET_POST = "posts/GET_POST";
const GET_POSTS = "posts/GET_POSTS";

const POST_ERROR = "posts/POST_ERROR";

const ADD_POST = "posts/ADD_POST";
const ADD_COMMENT = "posts/ADD_COMMENT";

const UPDATE_LIKES = "posts/UPDATE_LIKES";
const REMOVE_POST = "posts/REMOVE_POST";
const REMOVE_COMMENT = "posts/REMOVE_COMMENT";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/posts");

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getPost = (post_id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${post_id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addPost = (formDate) => async (dispatch) => {
  try {
    const res = await api.post(`/posts`, formDate);

    dispatch({ type: ADD_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const removePost = (post_id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${post_id}`);

    dispatch({ type: REMOVE_POST, payload: { _id: post_id } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addLike = (post_id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${post_id}`);

    dispatch({ type: UPDATE_LIKES, payload: { id: post_id, likes: res.data } });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const removeLike = (post_id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${post_id}`);

    dispatch({ type: UPDATE_LIKES, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addComment = (post_id, text) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${post_id}`, { text });

    dispatch({ type: ADD_COMMENT, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const removeComment = (post_id, comment_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/comment/${post_id}/${comment_id}`);


    dispatch({ type: REMOVE_COMMENT, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        loading: false,
        post: payload,
        posts: state.posts,
      };

    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
        posts: state.posts,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
        posts: state.posts,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case REMOVE_POST:
      return {
        ...state,
        post: null,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload._id),
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        posts: [],
        post: null,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.post_id
            ? { ...post, likes: payload.likes }
            : post
        ),
      };
    default:
      return { ...state };
  }
}
