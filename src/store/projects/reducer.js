import {
    GET_PROJECT_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAIL,
    UPDATE_PROJECT,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAIL,
    RESET_PROJECT_FLAG,
} from './actionType';

const INIT_STATE = {
    projectList: [],
};

const Projects = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_PROJECT_LIST: {
                    return {
                        ...state,
                        projectList: action.payload.data,
                        isProjectCreated: false,
                        isProjectSuccess: true,
                    };
                }
                default:
                    return { ...state };
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_PROJECT_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                        isProjectCreated: false,
                        isProjectSuccess: false,
                    };

                default:
                    return { ...state };
            }
        case GET_PROJECT_LIST: {
            return {
                ...state,
                isProjectCreated: false,
            };
        }

        case ADD_PROJECT_SUCCESS:
            return {
                ...state,
                isProjectCreated: true,
                projectList: [...state.projectList, action.payload],
                isProjectAdded: true,
                isProjectAddFail: false,
            };

        case ADD_PROJECT_FAIL:
            return {
                ...state,
                error: action.payload,
                isProjectAdded: false,
                isProjectAddFail: true,
            };

        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                projectList: state.projectList.map(project =>
                    project._id.toString() ===
                    action.payload.data._id.toString()
                        ? { ...project, ...action.payload.data }
                        : project
                ),
                isProjectUpdated: true,
                isProjectUpdateFail: false,
            };

        case UPDATE_PROJECT_FAIL:
            return {
                ...state,
                error: action.payload,
                isProjectUpdated: false,
                isProjectUpdateFail: true,
            };

        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                projectList: state.projectList.filter(
                    project =>
                        project._id.toString() !==
                        action.payload.project.toString()
                ),
                isProjectDeleted: true,
                isProjectDeleteFail: false,
            };

        case DELETE_PROJECT_FAIL:
            return {
                ...state,
                error: action.payload,
                isProjectDeleted: false,
                isProjectDeleteFail: true,
            };

        case RESET_PROJECT_FLAG:
            return {
                ...state,
                isProjectAdded: false,
                isProjectAddFail: false,
                isProjectDeleted: false,
                isProjectDeleteFail: false,
                isProjectUpdated: false,
                isProjectUpdateFail: false,
                error: false,
            };

        default:
            return { ...state };
    }
};

export default Projects;
