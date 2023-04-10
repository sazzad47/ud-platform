import {
    GET_DATASET_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    UPDATE_DATASET_SUCCESS,
    UPDATE_DATASET_FAIL,
    ADD_DATASET_SUCCESS,
    ADD_DATASET_FAIL,
    DELETE_DATASET_SUCCESS,
    DELETE_DATASET_FAIL,
    RESET_DATASET_FLAG,
} from './actionType';

const INIT_STATE = {
    datasetList: [],
};

const Datasets = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_DATASET_LIST: {
                    const temp = {
                        ...state,
                        datasetList: action.payload.data,
                    };

                    return temp;
                }
                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_DATASET_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { ...state };
            }

        case GET_DATASET_LIST: {
            return {
                ...state,
            };
        }

        case ADD_DATASET_SUCCESS: {
            console.log('Dataset reducer > ADD_DATASET_SUCCESS........');
            console.log({ action });

            return {
                ...state,
                datasetList: [...state.datasetList, action.payload],
                isDatasetAdded: true,
                isDatasetAddFail: false,
            };
        }

        case ADD_DATASET_FAIL:
            return {
                ...state,
                error: action.payload,
                isDatasetAdded: false,
                isDatasetAddFail: true,
            };

        case UPDATE_DATASET_SUCCESS: {
            console.log('Dataset reducer > UPDATE_DATASET_SUCCESS........');
            console.log({ action });
            return {
                ...state,
                datasetList: state.datasetList.map(dataset =>
                    dataset._id.toString() ===
                    action.payload.data._id.toString()
                        ? { ...dataset, ...action.payload.data }
                        : dataset
                ),
                isDatasetUpdated: true,
                isDatasetUpdateFail: false,
            };
        }
        case UPDATE_DATASET_FAIL:
            return {
                ...state,
                error: action.payload,
                isDatasetUpdated: false,
                isDatasetUpdateFail: true,
            };

        case DELETE_DATASET_SUCCESS:
            return {
                ...state,
                datasetList: state.datasetList.filter(
                    dataset =>
                        dataset._id.toString() !==
                        action.payload.datasetId.toString()
                ),
                isDatasetDeleted: true,
                isDatasetDeleteFail: false,
            };

        case DELETE_DATASET_FAIL:
            return {
                ...state,
                error: action.payload,
                isDatasetDeleted: false,
                isDatasetDeleteFail: true,
            };

        case RESET_DATASET_FLAG:
            return {
                ...state,
                isDatasetSuccess: false,
                isDatasetAdded: false,
                isDatasetAddFail: false,
                isDatasetDeleted: false,
                isDatasetDeleteFail: false,
                isDatasetUpdated: false,
                isDatasetUpdateFail: false,
                error: false,
            };

        default:
            return { ...state };
    }
};

export default Datasets;
