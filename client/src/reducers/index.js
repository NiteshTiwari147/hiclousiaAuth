import { combineReducers } from "redux";
import authReducer from "./authReducer";
import {candidateInfo, educationInfo, experienceInfo, projectInfo, skillSetInfo} from "./candidateReducer";

export default combineReducers({
   auth: authReducer,
   candidate: candidateInfo,
   education: educationInfo,
   experience: experienceInfo,
   project: projectInfo,
   skillSet: skillSetInfo
});