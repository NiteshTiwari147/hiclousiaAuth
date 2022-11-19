import { combineReducers } from "redux";
import authReducer from "./authReducer";
import {candidateInfo, educationInfo, experienceInfo, projectInfo, skillSetInfo} from "./candidateReducer";
import { HRInfo,jobsInfo, postedJobInfo, suggestedTalent } from "./hrReducer";

export default combineReducers({
   auth: authReducer,
   candidate: candidateInfo,
   education: educationInfo,
   experience: experienceInfo,
   project: projectInfo,
   skillSet: skillSetInfo,
   hr: HRInfo,
   jobs: jobsInfo,
   postedJobDetail: postedJobInfo,
   suggestedTalent: suggestedTalent
});