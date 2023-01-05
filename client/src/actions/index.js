import axios from 'axios';
import { FETCH_COMPENTENCY, FETCH_USER,FETCH_CANDIDATE,FETCH_EDUCATION,FETCH_EXPERIENCE,FETCH_PROJECT, FETCH_SKILLSET, FETCH_HR, FETCH_JOBS, FETCH_POSTEDJOB, SUGGESTED_TALENT, TALENT_DETAILS, FETCH_RELEVANT_JOBS, TOTAL_EXP } from './types';

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

export const fetchCompentency = () => async dispatch => {
    const res = await axios.get('/fetch/compentecy');
    console.log("compentecy ", res);
    dispatch({
        type: FETCH_COMPENTENCY,
        payload: res.data
    });
}

export const fetchTalentDetail = (props) => async dispatch => {
    const res = await axios.get('/fetch/talentDetail',{ params: {
        hiclousiaID: props.value.id
    }});
    dispatch({
        type: TALENT_DETAILS,
        payload: res.data
    })
}

export const fetchTalent = (props) => async dispatch => {
    const res = await axios.get('/fetch/talent',{ params: {
        industry: props.value.industry,
        department: props.value.department,
        experience: props.value.experience,
        budget: props.value.budget
    }});
    dispatch({
        type: SUGGESTED_TALENT,
        payload: res.data
    })
}

export const fetchRelevantJobs = (props) => async dispatch => {
    const res = await axios.get('/fetch/relevantJobs',{ params: {
        industry: props.value.industry,
        department: props.value.department,
    }});
    dispatch({
        type: FETCH_RELEVANT_JOBS,
        payload: res.data
    })
}

export const fetchHR = () => async dispatch => {
    const res = await axios.get('/fetch/hr');
    dispatch({
        type: FETCH_HR,
        payload: res.data
    });
}

export const fetchJobs = () => async dispatch => {
    const res = await axios.get('/fetch/jobs');
    dispatch({
        type: FETCH_JOBS,
        payload: res.data
    });
}

export const fetchPostedJob = (props) => async dispatch => {
    const res = await axios.get('/fetch/jobDetail', { params: {
        jobID: props.value.jobID
    }});
    dispatch({
        type: FETCH_POSTEDJOB,
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
        payload: res.data.expData.experiences
    });
    dispatch({
        type: TOTAL_EXP,
        payload: res.data.expData.totalExp
    });
}

export const logIn = (props) => async dispatch => {
    const obj = {
        email: props.value.email,
        password: props.value.password
    }
    const res = await axios.post('/api/login', obj);
    console.log(res);
    dispatch({
        type: FETCH_USER,
        payload: res.data.user
    });
    return res;
}

export const signUp = (props) => async dispatch => {
    const obj = {
        email: props.value.email,
        password: props.value.password,
        role: props.value.role
    }
    const res = await axios.post('/api/signin', obj);
    dispatch({
        type: FETCH_USER,
        payload: res.data.user
    });
    return res;
}

export const sendBasicInfo =  (props) => async dispatch => {
    const obj = {
            name: props.value.name,
            age: props.value.age,
            gender: props.value.gender,
            address: props.value.address,
            currentCity: props.value.currentCity,
            nationality: props.value.country,
            phone: props.value.phone,
            linkedIN: props.value.socialLink,
            role: props.value.role,
            expectedCities: props.value.expectedCities,
            purpose: props.value.purpose,
            expectedPosition: props.value.expectedPosition,
            expectedSalary: {
                min: props.value.expectedSalary.min,
                max: props.value.expectedSalary.max
            },
            experience: {
                year: props.value.experience.year,
                month: props.value.experience.month
            },
            expectedIndustry: props.value.expectedIndustry,
            expectedDepartment: props.value.expectedDepartment,
    };
    const res = await axios.post('/create/candidate', obj);
}

export const sendHRBasicInfo = (props) => async dispatch => {
    const obj = {
        name: props.value.name,
        companyName: props.value.company,
        city: props.value.city
    }
    const res = await axios.post('/create/hr', obj);
}

export const sendProjectInfo = (props) => async dispatch => {
    const obj = {
        title: props.value.title,
        typeOfProject: props.value.typeOfProject,
        description: props.value.desc,
        outcomes: props.value.outcomes,
        duration: props.value.duration,             
        industry: props.value.industry,
        department: props.value.department,
        startDate: props.value.startDate,
        endDate: props.value.endDate,
        skills: props.value.selectedSkill,
        location: props.value.location,
        manager: props.value.manager,
        managerContact: props.value.managerContact
    };
    const res = await axios.post('/create/project', obj);
}

export const sendJobPostInfo = (props) => async dispatch => {
    const obj = {
        companyName: props.value.company,
        experience: {
            min: props.value.minExp,
            max: props.value.maxExp,
        },
        description: props.value.desc,
        industry: props.value.industry,
        department: props.value.department,
        skills: props.value.skills,
        cities: props.value.cities,
        budget: {
            min: props.value.minBudget,
            max: props.value.maxBudget,
        }
    }
   const res = await axios.post('/create/jobPost', obj);
}

export const sendExperienceInfo = (props) => async dispatch => {
    const obj = {
        company: props.value.company,
        designation: props.value.designation,
        typeOfExperience: props.value.typeOfExperience,
        isCurrent: props.value.isCurrent, 
        duration: props.value.duration,
        industry: props.value.industry, 
        department: props.value.department,
        startDate: props.value.startDate,
        endDate:  props.value.endDate,
        skills:  props.value.skills,
        location: props.value.location,
        manager: props.value.manager,
        managerContact: props.value.managerContact,
        responsibility: props.value.responsibilty
          
    };
    const res = await axios.post('/create/experience', obj);
}

export const sendEducationInfo = (props) => async dispatch => {
    const obj = {
        institute: props.value.institute,
        institueName: props.value.instituteName,
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
        skillList: props.value.skillList,
        duration: props.value.duration,
        typeOfProject: props.value.typeOfProject, 
    }
    const res = await axios.post('/update/skills', obj);
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

export const updateExpectation = (props) => async dispatch => {
    const obj = {
        name: props.value.name,
        age: props.value.age,
        city: props.value.city,
        gender: props.value.gender,
        role: props.value.role,
        purpose: props.value.purpose,
        expectedSalary: {
            min: props.value.expectedSalary.min,
            max: props.value.expectedSalary.max
        },
        expectedIndustry: props.value.expectedIndustry,
        expectedDepartment: props.value.expectedDepartment,
    };
    const res = await axios.put('/update/expectation', obj);
}

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

export const deleteProject = (props) => async dispatch => {
    const obj = {
        id: props.value.id,
    }
    console.log(obj)
    const res = await axios.put('/delete/project', obj);
};

export const deleteExperience = (props) => async dispatch => {
    const obj = {
        id: props.value.id
    }
    const res = await axios.put('/delete/experience', obj);
};