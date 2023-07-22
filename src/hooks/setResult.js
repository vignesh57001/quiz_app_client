import { postServerData } from "../helper/helper.js";
import * as Action from "../redux/result_reducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

export const publishResult = (resultData) => {
  const { result, username } = resultData;
  (async () => {
    try {
      if (result !== [] && !username) throw new Error("could not GET result");
      await postServerData(
        "https://quiz-app-server-2ntr.onrender.com/api/result",
        resultData,
        (data) => data
      );
    } catch (error) {
      console.log(error);
    }
  })();
};
