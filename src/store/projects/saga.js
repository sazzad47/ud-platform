import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import {
    GET_PROJECT_LIST,
    ADD_NEW_PROJECT,
    DELETE_PROJECT,
    UPDATE_PROJECT,
} from './actionType';
import {
    projectApiResponseSuccess,
    projectApiResponseError,
    addProjectSuccess,
    addProjectFail,
    updateProjectSuccess,
    updateProjectFail,
    deleteProjectSuccess,
    deleteProjectFail,
} from './action';

//Include Both Helper File with needed methods
import {
    getProjectList as getProjectListApi,
    addNewProject,
    updateProject,
    deleteProject,
} from '../../helpers/fakebackend_helper';

function* getProjectList() {
    try {
        const response = yield call(getProjectListApi);
        yield put(projectApiResponseSuccess(GET_PROJECT_LIST, response));
    } catch (error) {
        yield put(projectApiResponseError(GET_PROJECT_LIST, error));
    }
}

function* onAddNewProject({ payload: project }) {
    try {
        const response = yield call(addNewProject, project);

        yield put(addProjectSuccess(response));
    } catch (error) {
        yield put(addProjectFail(error));
    }
}

function* onUpdateProject({ payload: project }) {
    try {
        const response = yield call(updateProject, project);
        yield put(updateProjectSuccess(response));
    } catch (error) {
        yield put(updateProjectFail(error));
    }
}

function* onDeleteProject({ payload: project }) {
    try {
        const response = yield call(deleteProject, project);
        yield put(deleteProjectSuccess({ project, ...response }));
    } catch (error) {
        yield put(deleteProjectFail(error));
    }
}

export function* watchGetProjectList() {
    yield takeEvery(GET_PROJECT_LIST, getProjectList);
}

export function* watchAddNewProject() {
    yield takeEvery(ADD_NEW_PROJECT, onAddNewProject);
}

export function* watchUpdateProject() {
    yield takeEvery(UPDATE_PROJECT, onUpdateProject);
}

export function* watchDeleteProject() {
    yield takeEvery(DELETE_PROJECT, onDeleteProject);
}

function* projectSaga() {
    yield all([
        fork(watchGetProjectList),
        fork(watchAddNewProject),
        fork(watchUpdateProject),
        fork(watchDeleteProject),
    ]);
}

export default projectSaga;
