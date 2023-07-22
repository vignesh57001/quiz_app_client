import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { useSelector, useDispatch } from "react-redux";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  // const trace = useSelector((state) => state.questions.trace);
  const [check, setChecked] = useState(undefined);
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  function onPrev() {
    if (trace > 0) {
      // update the trace value as -1 by using MOVEPREVQUESTION
      dispatch(MovePrevQuestion());
    }
  }
  function onNext() {
    console.log("on next click");
    if (trace < queue.length) {
      // update the trace value as +1 by using MOVENEXTQUESTION
      dispatch(MoveNextQuestion());

      // insert new result in the array
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    // reset value checked
    setChecked(undefined);
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  // finish the exam after last question
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace="true"></Navigate>;
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Questions</h1>

      {/* display questions */}
      <Questions onChecked={onChecked} />

      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
