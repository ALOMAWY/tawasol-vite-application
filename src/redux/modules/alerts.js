/*
1_ Define Action 
2_ Action Creator function()
3_ Reducer function()
 */

const SHOW_ALERT_MESSAGE = "alert/SHOW_ALERT_MESSAGE";

// Action Creator
export function showAlertMessage(msg, type = "info") {
  return function showAlertMessageThunk(dispatch) {
    dispatch({
      type: SHOW_ALERT_MESSAGE,
      payload: {
        show: true,
        msg,
        type,
      },
    });
  };
}

const initialState = {
  show: false,
  msg: "",
  type: "info",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      return {
        ...state,
        show: true,
        msg: action.payload.msg,
        type: action.payload.type,
      };

    default:
      return state;
  }
}
