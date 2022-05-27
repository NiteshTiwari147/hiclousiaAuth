import { FETCH_CANDIDATE } from "../actions/types";

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_CANDIDATE: 
            return action.payload || false;
        default: 
            return null;
    }
}