import { combineReducers } from "redux";
import authReducer from "./authReducer";
import {candidateInfo, educationInfo, experienceInfo, projectInfo, skillSetInfo, relevantJobsInfo} from "./candidateReducer";
import { HRInfo,jobsInfo, postedJobInfo, suggestedTalent, talentDetail } from "./hrReducer";

export default combineReducers({
   auth: authReducer,
   candidate: candidateInfo,
   education: educationInfo,
   experience: experienceInfo,
   project: projectInfo,
   skillSet: skillSetInfo,
   relevantJobs: relevantJobsInfo, 
   hr: HRInfo,
   jobs: jobsInfo,
   postedJobDetail: postedJobInfo,
   suggestedTalent: suggestedTalent,
   talentDetail: talentDetail,
});