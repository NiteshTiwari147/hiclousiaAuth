import { FETCH_HR,FETCH_JOBS, FETCH_POSTEDJOB, SUGGESTED_TALENT, TALENT_DETAILS } from "../actions/types";

export function HRInfo(state = null, action) {
    switch(action.type) {
        case FETCH_HR: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function jobsInfo(state=null, action) {
    switch(action.type) {
        case FETCH_JOBS: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function postedJobInfo(state=null, action) {
    switch(action.type) {
        case FETCH_POSTEDJOB: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function suggestedTalent(state=null, action) {
    switch(action.type) {
        case SUGGESTED_TALENT: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function talentDetail(state=null, action) {
    switch(action.type) {
        case TALENT_DETAILS: 
            return action.payload || false;
        default: 
            return state;
    }
}
