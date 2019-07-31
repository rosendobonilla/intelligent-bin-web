import {
    LOADING_DATA,
    LIKE_PROJECT,
    UNLIKE_PROJECT,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_PROJECT,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    SET_PROJECTS,
    DELETE_PROJECT,
    CREATE_PROJECT, SET_TRASH_HISTORY
} from '../types';
import axios from 'axios';

export const getProject = (projectId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/project/${projectId}`)
        .then((res) => {
            dispatch({
                type: SET_PROJECT,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};


// Post a scream
export const createProject = (newProject) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/project', newProject)
        .then((res) => {
            dispatch({
                type: CREATE_PROJECT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// Get all projects
/*export const getProjects = () => async (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/projects')
        .then((res) => {
            dispatch({
                type: SET_PROJECTS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_PROJECTS,
                payload: []
            });
        });
};*/
//metodo reemplazado por el action en redux/actions/projects/getProjectsAtion.js
//para actualizar en tiempo real los proyectos


export const likeProject = (projectId) => (dispatch) => {
    axios
        .get(`/project/${projectId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

export const unlikeProject = (projectId) => (dispatch) => {
    axios
        .get(`/project/${projectId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

export const deleteProject = (projectId) => (dispatch) => {
    axios
        .post(`/project/delete/${projectId}`)
        .then(() => {
            dispatch({ type: DELETE_PROJECT, payload: projectId });
        })
        .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Comentar proyecto
export const submitComment = (screamId, commentData) => (dispatch) => {
    axios
        .post(`/project/${screamId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`/user/${userHandle}`)
        .then((res) => {
            dispatch({
                type: SET_PROJECTS,
                payload: res.data.projects
            });
        })
        .catch(() => {
            dispatch({
                type: SET_PROJECTS,
                payload: null
            });
        });
};

export const updateTrashStats = (newData, dataRecycling, history) => (dispatch) => {
    axios
        .post('/trash/update', newData)
        .then((res) => {
            axios
                .post('/trash/recycling', dataRecycling)
                .then((res) => {
                    history.push('/admin/feed');
                    //window.location = "/admin/feed";
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

export const getTrashHistory = () => (dispatch) => {
    axios
        .post('/trash/history')
        .then((res) => {
            dispatch({
                type: SET_TRASH_HISTORY,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

