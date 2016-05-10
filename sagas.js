import { takeEvery, takeLatest } from 'redux-saga'
import {
    put,
    call,
    apply,
    take,
    fork,
    cancel,
    cancelled,
    race,
    actionChannel
} from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { fetchImages } from './Api'

const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

function *fetchData(url) {
    try {
        yield put({type: 'START_LOADING'});
        const response = yield call(fetch, url);
        const data = yield apply(response, response.json);
        yield put({type: 'FETCH_SUCCEEDED', payload: data});
    } catch (err) {
        yield put({type: 'FETCH_ERROR', payload: err})
    } finally {
        yield put({type: 'STOP_LOADING'});
    }
}

function *watchAndFetch() {
    while(true){
        const { url } = yield take('FETCH_REQUEST');
        yield race({
            fetch: call(fetchData, url),
            cancel: take('CANCEL_FETCH'),
            error: take('FETCH_ERROR')
        });
    }
}

function *runTimer(getState) {
    while(true){
        yield delay(3000);
        yield [
            put({type: 'TICK'}),
            put({
                type: 'FETCH_REQUEST',
                url: `http://jsonplaceholder.typicode.com/posts/${getState().id + 1}`
            })
        ];
        console.log('Tick');
    }
}

function *watchTimer(getState) {
    while(true){
        yield take('START_TIMER');
        const timerTask = yield fork(runTimer, getState);
        yield race({
            stop: take('STOP_TIMER'),
            reset: take('RESET_TIMER')
        });
        yield cancel(timerTask);
    }
}

function *loadImages() {
    try {
        yield put({type: 'START_LOADING'});
        const images = yield call(fetchImages);
        yield put({ type: 'IMAGES_LOADED', payload: { images }});
        yield put({type: 'CHANGE_SELECTED_IMAGE', payload: { index: 3 }})
    } catch (error) {
        yield put({ type: 'IMAGES_FETCH_FAILED', error });
        console.log(error);
    } finally {
        yield put({type: 'STOP_LOADING'});
    }
}

function *watchForLoadImages() {
    while(true){
        yield take('LOAD_IMAGES');
        yield fork(loadImages);
    }
}

function *authorize(){
    let attempts = 0;
    while (attempts < 3) {
        const { password } = yield take('LOGININ');
        debugger;
        if (password != '12345'){
            attempts++;
            console.log('Wrong Password');
        } else {
            yield put({type: 'LOGIN_SUCCESS'});
        }
    }
    console.log('Rejected!');
    yield put({type: 'LOGIN_REJECTED'});
}


function *loginSaga() {
    while(true){
        const authorizeTask = yield fork(authorize);
        const { success } = yield race({
            success: take('LOGIN_SUCCESS'),
            reject: take('LOGIN_REJECTED')
        });

        if (success){
            console.log('SUCCESS!!!');
        } else {
            console.log('REJECT!!!');
        }
        debugger;
        yield cancel(authorizeTask);
    }
}

function *watchTakeLatest(){
    let lastTask;

    while(yield take('LOGIN')){

        if (lastTask){
            yield cancel(lastTask);
            console.log('Cancel task:', lastTask);
        }

        lastTask = yield fork(loadImages);
    }
}

export default function *rootSaga(getState) {
    const [ wfTask, timerTask, loginTask, wLatest ] = yield [
        fork(watchAndFetch),
        fork(watchTimer, getState),
//        watchForLoadImages(),
        fork(loginSaga),
        fork(watchTakeLatest)
    ];

    yield take('LOGIN');
    yield cancel(timerTask);
}


