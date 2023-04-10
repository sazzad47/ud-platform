import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import {
    GET_DATASET_LIST,
    ADD_NEW_DATASET,
    DELETE_DATASET,
    UPDATE_DATASET,
} from './actionType';
import {
    datasetApiResponseSuccess,
    datasetApiResponseError,
    addDatasetSuccess,
    addDatasetFail,
    updateDatasetSuccess,
    updateDatasetFail,
    deleteDatasetSuccess,
    deleteDatasetFail,
} from './action';

//Include Both Helper File with needed methods
import {
    getDatasetList as getDatasetListApi,
    addNewDataset,
    deleteDataset,
    updateDataset,
} from '../../helpers/fakebackend_helper';

function* getDatasetList() {
    try {
        const response = yield call(getDatasetListApi);
        yield put(datasetApiResponseSuccess(GET_DATASET_LIST, response));
    } catch (error) {
        yield put(datasetApiResponseError(GET_DATASET_LIST, error));
    }
}

function* onAddNewDataset({ payload: dataset }) {
    try {
        const response = yield call(addNewDataset, dataset);

        yield put(addDatasetSuccess(response));
    } catch (error) {
        yield put(addDatasetFail(error));
    }
}

function* onDeleteDataset({ payload: datasetId }) {
    try {
        const response = yield call(deleteDataset, datasetId);
        yield put(deleteDatasetSuccess({ datasetId, ...response }));
    } catch (error) {
        yield put(deleteDatasetFail(error));
    }
}

function* onUpdateDataset({ payload: dataset }) {
    try {
        const response = yield call(updateDataset, dataset);
        yield put(updateDatasetSuccess(response));
    } catch (error) {
        yield put(updateDatasetFail(error));
    }
}

export function* watchGetDatasetList() {
    yield takeEvery(GET_DATASET_LIST, getDatasetList);
}

export function* watchAddNewDataset() {
    yield takeEvery(ADD_NEW_DATASET, onAddNewDataset);
}

export function* watchUpdateDataset() {
    yield takeEvery(UPDATE_DATASET, onUpdateDataset);
}

export function* watchDeleteDataset() {
    yield takeEvery(DELETE_DATASET, onDeleteDataset);
}

function* datasetSaga() {
    yield all([
        fork(watchGetDatasetList),
        fork(watchAddNewDataset),
        fork(watchUpdateDataset),
        fork(watchDeleteDataset),
    ]);
}

export default datasetSaga;
