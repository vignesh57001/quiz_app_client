import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <ol>
        <li>You will be asked 5 questions one after another.</li>
        <li>4 Points is awarded for the correct answer.</li>
        <li>Each questions has 3 options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form id="form">
        <input
          ref={inputRef}
          type="text"
          className="userid"
          placeholder="User Name *"
        />
      </form>

      <div className="start">
        <Link className="btn" to={"quiz"} onClick={startQuiz}>
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
