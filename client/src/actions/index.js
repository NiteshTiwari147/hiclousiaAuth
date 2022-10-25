import axios from 'axios';
import { FETCH_USER,FETCH_CANDIDATE,FETCH_EDUCATION,FETCH_EXPERIENCE,FETCH_PROJECT, FETCH_SKILLSET } from './types';

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
    });
}

export const fetchProject = () => async dispatch => {
    const res = await axios.get('/fetch/Project');
    dispatch({
        type: FETCH_PROJECT,
        payload: res.data
    });
}

export const fetchEducation = () => async dispatch => {
    const res = await axios.get('/fetch/Education');
    dispatch({
        type: FETCH_EDUCATION,
        payload: res.data
    });
}

export const fetchSkillSet = () => async dispatch => {
    const res = await axios.get('/fetch/skillSet');
    dispatch({
        type: FETCH_SKILLSET,
        payload: res.data
    });
}

export const fetchExperience = () => async dispatch => {
    const res = await axios.get('/fetch/Experience');
    dispatch({
        type: FETCH_EXPERIENCE,
        payload: res.data
    });
}

export const sendBasicInfo =  (props) => async dispatch => {
    const obj = {
            name: props.value.name,
            age: props.value.age,
            city: props.value.city,
            gender: props.value.gender,
            role: props.value.role,
            purpose: props.value.purpose,
            expectedPosition: props.value.expectedPosition,
            expectedSalary: props.value.expectedSalary,
            expectedIndustry: props.value.expectedIndustry,
            expectedDepartment: props.value.expectedDepartment,
    };
    const res = await axios.post('/create/candidate', obj);
}

export const sendProjectInfo = (props) => async dispatch => {
    const obj = {
        title: props.value.title,
        description: props.value.desc,
        start_date: props.value.startDate,
        end_date: props.value.endDate,
        skills: props.value.skills,
        industry: props.value.industry,
        department: props.value.department
    };
    const res = await axios.post('/create/project', obj);
}

export const sendExperienceInfo = (props) => async dispatch => {
    const obj = {
        company: props.value.company,
        designation: props.value.designation,
        typeOfExperience: props.value.typeOfExperience,
        description: props.value.desc,
        isCurrent: props.value.isCurrent,
        industryExperience: props.value.industryExperience,
        skills: props.value.skills,
        industry: props.value.industry,
        department: props.value.department
    };
    const res = await axios.post('/create/experience', obj);
}

export const sendEducationInfo = (props) => async dispatch => {
    const obj = {
        institute: props.value.institute,
        course: props.value.course,
        field_of_course: props.value.field_of_course,
        start_date: props.value.startDate,
        end_date: props.value.endDate,
        grade: props.value.grade,
    };
    const res = await axios.post('/create/education', obj);
}

export const sendSkillList = (props) => async dispatch => {
    const obj = {
        skillsObj: props.value.skillList
    };
    const res = await axios.post('/create/skills', obj);
}

export const updateEducationInfo = (props) => async dispatch => {
    const obj = {
        id: props.value.id,
        institute: props.value.institute,
        course: props.value.course,
        field_of_course: props.value.field_of_course,
        start_date: props.value.startDate,
        end_date: props.value.endDate,
        grade: props.value.grade,
    };
    const res = await axios.put('/update/education', obj);
};

export const updateExperienceInfo = (props) => async dispatch => {
    const obj = {
        id: props.value.id,
        company: props.value.company,
        designation: props.value.designation,
        typeOfExperience: props.value.typeOfExperience,
        description: props.value.desc,
        industryExperience: props.value.industryExperience,
        skills: props.value.skills,
        industry: props.value.industry,
        department: props.value.department
    }
    const res = await axios.put('/update/experience',obj);
};

export const deleteEducation = (props) => async dispatch => {
    const obj = {
        id: props.value.id,
    }
    const res = await axios.put('/delete/education', obj);
};

export const deleteExperience = (props) => async dispatch => {
    const obj = {
        id: props.value.id
    }
    const res = await axios.put('/delete/experience', obj);
};