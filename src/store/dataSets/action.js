import {
    GET_DATASET_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    UPDATE_DATASET,
    UPDATE_DATASET_SUCCESS,
    UPDATE_DATASET_FAIL,
    ADD_NEW_DATASET,
    ADD_DATASET_SUCCESS,
    ADD_DATASET_FAIL,
    DELETE_DATASET,
    DELETE_DATASET_SUCCESS,
    DELETE_DATASET_FAIL,
    RESET_DATASET_FLAG,
} from './actionType';

// common success
export const datasetApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const datasetApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getDatasetList = () => ({
    type: GET_DATASET_LIST,
});

export const addNewDataset = dataset => ({
    type: ADD_NEW_DATASET,
    payload: dataset,
});

export const addDatasetSuccess = dataset => ({
    type: ADD_DATASET_SUCCESS,
    payload: dataset,
});

export const addDatasetFail = error => ({
    type: ADD_DATASET_FAIL,
    payload: error,
});

export const updateDataset = dataset => ({
    type: UPDATE_DATASET,
    payload: dataset,
});

export const updateDatasetSuccess = dataset => ({
    type: UPDATE_DATASET_SUCCESS,
    payload: dataset,
});

export const updateDatasetFail = error => ({
    type: UPDATE_DATASET_FAIL,
    payload: error,
});

export const deleteDataset = dataset => ({
    type: DELETE_DATASET,
    payload: dataset,
});

export const deleteDatasetSuccess = dataset => ({
    type: DELETE_DATASET_SUCCESS,
    payload: dataset,
});

export const deleteDatasetFail = error => ({
    type: DELETE_DATASET_FAIL,
    payload: error,
});

export const resetDatasetFlag = () => {
    return {
        type: RESET_DATASET_FLAG,
    };
};
