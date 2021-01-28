import { combineReducers } from "redux";
import upVotedReducer from "./upVotedReducer";
import downVotedReducer from "./downVotedReducer";

const Reducers = combineReducers({
  upVoted: upVotedReducer,
  downVoted: downVotedReducer,
});

export default Reducers;
