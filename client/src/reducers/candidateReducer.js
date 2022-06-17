import { FETCH_CANDIDATE,FETCH_EDUCATION,FETCH_EXPERIENCE,FETCH_PROJECT } from "../actions/types";

export function candidateInfo(state = null, action) {
    switch(action.type) {
        case FETCH_CANDIDATE: 
            return action.payload || false;
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