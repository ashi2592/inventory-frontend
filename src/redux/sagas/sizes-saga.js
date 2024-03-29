import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_SIZE_LIST,
    GET_SIZE_LIST_SUCCESS,
    ADD_SIZE,
    ADD_SIZE_SUCCESS,
    GET_SIZE_DETAILS,
    GET_SIZE_DETAILS_SUCCESS,
    DELETE_SIZE,
    DELETE_SIZE_SUCCESS,
    UPDATE_SIZE,
    UPDATE_SIZE_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/sizes-api'



function* getSizes({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_SIZE_LIST_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getSize({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getDeatils, payload.id);
        yield put({ type: GET_SIZE_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addSize({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_SIZE_SUCCESS, payload: newdata })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updateSize({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_SIZE_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deleteSize({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_SIZE_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }


}


export default function* sizeSaga() {
    yield takeEvery(GET_SIZE_LIST, getSizes)
    yield takeEvery(GET_SIZE_DETAILS, getSize)
    yield takeLatest(ADD_SIZE, addSize)
    yield takeLatest(UPDATE_SIZE, updateSize)
    yield takeEvery(DELETE_SIZE, deleteSize)

}