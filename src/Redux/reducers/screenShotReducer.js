import { TAKE_SCREEN_SHOOT } from "../types/screenShotTypes";

const initialState = {
  imgURl: "my initial state",
};

export const cvScreenShot = (state) => state.screenShotReducer.imgURl;

export default function screenShotReducer(state = initialState, action) {
  switch (action.types) {
    case TAKE_SCREEN_SHOOT:
      console("m");
      return {
        ...state,
        imgURl: action.payload,
      };
    default:
      return state;
  }
}
