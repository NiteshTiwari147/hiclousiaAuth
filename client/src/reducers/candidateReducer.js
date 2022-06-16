import { FETCH_CANDIDATE, FETCH_EDUCATION, FETCH_EXPERIENCE, FETCH_PROJECT } from "../actions/types";

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_CANDIDATE: 
            return action.payload || false;
        case FETCH_EDUCATION: 
            return action.payload || false;
        case FETCH_PROJECT: 
            return action.payload || false;
        case FETCH_EXPERIENCE: 
            return action.payload || false;
        default: 
            return null;
    }
}