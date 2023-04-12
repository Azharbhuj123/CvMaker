import * as actionTypes from "../types/screenShotTypes";

export const takeScreenShot = (payload) => {
  console.log(payload, ">======== payload");
  return { type: actionTypes.TAKE_SCREEN_SHOOT, payload };
};
