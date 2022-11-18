import { FETCH_HR,FETCH_JOBS } from "../actions/types";

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