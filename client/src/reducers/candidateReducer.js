import { FETCH_CANDIDATE,FETCH_EDUCATION,FETCH_EXPERIENCE,FETCH_PROJECT, FETCH_SKILLSET,FETCH_RELEVANT_JOBS } from "../actions/types";

export function candidateInfo(state = null, action) {
    switch(action.type) {
        case FETCH_CANDIDATE: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function skillSetInfo(state=null, action) {
    switch(action.type) {
        case FETCH_SKILLSET:
            return action.payload || [];
        default: 
            return state;
    }
}

export function projectInfo(state=null, action) {
    switch(action.type) {
        case FETCH_PROJECT: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function relevantJobsInfo(state=null, action) {
    switch(action.type) {
        case FETCH_RELEVANT_JOBS: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function educationInfo(state=null, action) {
    switch(action.type) {
        case FETCH_EDUCATION: 
            return action.payload || false;
        default: 
            return state;
    }
}

export function experienceInfo(state=null, action) {
    switch(action.type) {
        case FETCH_EXPERIENCE: 
            return action.payload || false;
        default: 
            return state;
    }
}