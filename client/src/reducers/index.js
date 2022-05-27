import { combineReducers } from "redux";
import authReducer from "./authReducer";
import CandidateReducer from "./candidateReducer";

export default combineReducers({
   auth: authReducer,
   candidate: CandidateReducer
});