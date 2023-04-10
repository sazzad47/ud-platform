import {
    GET_PROJECT_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    UPDATE_PROJECT,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,
    ADD_NEW_PROJECT,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAIL,
    DELETE_PROJECT,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAIL,
    RESET_PROJECT_FLAG,
} from './actionType';

// common success
export const projectApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const projectApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getProjectList = () => ({
    type: GET_PROJECT_LIST,
});

export const updateProject = project => ({
    type: UPDATE_PROJECT,
    payload: project,
});

export const updateProjectSuccess = project => ({
    type: UPDATE_PROJECT_SUCCESS,
    payload: project,
});

export const updateProjectFail = error => ({
    type: UPDATE_PROJECT_FAIL,
    payload: error,
});

export const addNewProject = project => ({
    type: ADD_NEW_PROJECT,
    payload: project,
});

export const addProjectSuccess = project => ({
    type: ADD_PROJECT_SUCCESS,
    payload: project,
});

export const addProjectFail = error => ({
    type: ADD_PROJECT_FAIL,
    payload: error,
});

export const deleteProject = project => ({
    type: DELETE_PROJECT,
    payload: project,
});

export const deleteProjectSuccess = project => ({
    type: DELETE_PROJECT_SUCCESS,
    payload: project,
});

export const deleteProjectFail = error => ({
    type: DELETE_PROJECT_FAIL,
    payload: error,
});

export const resetProjectFlag = () => {
    return {
        type: RESET_PROJECT_FLAG,
    };
};
