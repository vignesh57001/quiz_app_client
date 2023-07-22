import { combineReducers, configureStore } from "@reduxjs/toolkit";

/**import reducers**/
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
});

/**Create Store With Reducer**/
export default configureStore({ reducer: rootReducer });
