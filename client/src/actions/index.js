import axios from 'axios';
import { FETCH_USER,FETCH_CANDIDATE } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
};

export const fetchCandidate = () => async dispatch => {
    const res = await axios.get('/fetch/Candidate');
    dispatch({
        type: FETCH_CANDIDATE,
        payload: res.data
    })
}

export const sendBasicInfo =  (props) => async dispatch => {
    const obj = {
        firstName: props.value.firstName,
        lastName: props.value.lastName,
        age: props.value.age,
        location: props.value.location, 
        contactNumber: props.value.contactNumber, 
        address: props.value.address
    }
    const res = await axios.post('/create/candidate', obj);
}

export const sendProjectInfo = (props) => async dispatch => {
    const obj = {
        title: props.value.title,
        description: props.value.desc,
        start_date: props.value.startDate,
        end_date: props.value.endDate,
        skills: props.value.skills,
        industry: props.value.industry 
    }
    const res = await axios.post('/create/project', obj);
}

export const sendExperienceInfo = (props) => async dispatch => {
    const obj = {
        company: props.value.company,
        designation: props.value.designation,
        description: props.value.desc,
        start_date: props.value.startDate,
        end_date: props.value.endDate,
        skills: props.value.skills,
        industry: props.value.industry 
    }
    const res = await axios.post('/create/experience', obj);
}

export const sendEducationInfo = (props) => async dispatch => {
    const obj = {
        institute: props.value.institute,
        course: props.value.course,
        field_of_course: props.value.field_of_course,
        start_date: props.value.startDate,
        end_date: props.value.endDate,
        industry: props.value.industry,
        grade: props.value.grade,
    }
    const res = await axios.post('/create/education', obj);
}