import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from './actionTypes';
import { apiError, loginSuccess, logoutUserSuccess } from './actions';

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';
import {
    postFakeLogin,
    postJwtLogin,
    postSocialLogin,
} from '../../../helpers/fakebackend_helper';

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const response = yield call(
                fireBaseBackend.loginUser,
                user.email,
                user.password
            );
            yield put(loginSuccess(response));
        } else if (process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
            const response = yield call(postJwtLogin, {
                email: user.email,
                password: user.password,
            });
            sessionStorage.setItem('authUser', JSON.stringify(response));
            yield put(loginSuccess(response));
        } else if (process.env.REACT_APP_API_URL) {
            const response = yield call(postFakeLogin, {
                email: user.email,
                password: user.password,
            });
            sessionStorage.setItem('authUser', JSON.stringify(response));

            if (response.status === 'success') {
                yield put(loginSuccess(response));

                // Juan Guirao
                // The following sessionStorage.setItem instructions are part of a solution to load
                // initial values only one time, when we first visit the projectList page (or the
                // Datasetlist page) after login.
                // However, for this to work properly we need to add something like Redux Persist
                // https://www.npmjs.com/package/redux-persist
                // https://www.howtogeek.com/devops/how-to-persist-your-redux-store/
                // Otherwise, we will have the problem that a refresh (F5) will empty Redux and it will not be
                // re-populated with init values (because it is not the first time we visit the page).

                // sessionStorage.setItem('projectListVisited', false);
                // sessionStorage.setItem('datasetListVisited', false);

                // In the original template, this used to be:
                // history.push('/dashboard');
                history.push('/apps-projects-list');
            } else {
                yield put(apiError(response));
            }
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser() {
    try {
        sessionStorage.removeItem('authUser');
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const response = yield call(fireBaseBackend.logout);
            yield put(logoutUserSuccess(LOGOUT_USER, response));
        } else {
            yield put(logoutUserSuccess(LOGOUT_USER, true));
        }
    } catch (error) {
        yield put(apiError(LOGOUT_USER, error));
    }
}

function* socialLogin({ payload: { data, history, type } }) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const fireBaseBackend = getFirebaseBackend();
            const response = yield call(
                fireBaseBackend.socialLoginUser,
                data,
                type
            );
            sessionStorage.setItem('authUser', JSON.stringify(response));
            yield put(loginSuccess(response));
        } else {
            const response = yield call(postSocialLogin, data);
            sessionStorage.setItem('authUser', JSON.stringify(response));
            yield put(loginSuccess(response));
        }
        history.push('/dashboard');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeLatest(SOCIAL_LOGIN, socialLogin);
    yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
