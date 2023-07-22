import { useEffect, useState } from "react";
// import data, { answers } from "../database/data";
import { useDispatch } from "react-redux";
import * as Action from "../redux/question_reducer";
import { getServerData } from "../helper/helper.js";

// fetch questions hook to fetch api data and set value to store
export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        // let question = await data;
        const [{ questions, answers }] = await getServerData(
          "https://quiz-app-server-2ntr.onrender.com/api/questions",
          (data) => data
        );
        console.log({ questions, answers });

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { questions, answers } }));

          // dispatch an action
          dispatch(Action.startExamAction({ question: questions, answers }));
        } else {
          throw new Error("No questions available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: true }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

// move next action dispatch function

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

// move prev action dispatch function

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
