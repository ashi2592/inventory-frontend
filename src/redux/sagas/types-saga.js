import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_TYPE_LIST,
    GET_TYPE_LIST_SUCCESS,
    ADD_TYPE,
    ADD_TYPE_SUCCESS,
    GET_TYPE_DETAILS,
    GET_TYPE_DETAILS_SUCCESS,
    DELETE_TYPE,
    DELETE_TYPE_SUCCESS,
    UPDATE_TYPE,
    UPDATE_TYPE_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/types-api'



function* getTypes({payload}) {
    try{
        yield put({ type: SET_LOADING })
        const types =yield call(getList,payload.page,payload.count,payload.searchText);
        yield put({ type: GET_TYPE_LIST_SUCCESS, payload: types })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* getType({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const type = yield call(getDeatils, payload.id);
        yield put({ type: GET_TYPE_DETAILS_SUCCESS, payload: type })
    
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
}

function* addType({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_TYPE_SUCCESS, payload: newdata })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
    
}

function* updateType({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_TYPE_SUCCESS, payload: payload })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}


function* deleteType({ payload }) {
    try{
        yield put({ type: SET_LOADING })
     yield call(DeleteFunction, payload);
    yield put({ type: DELETE_TYPE_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
    
}


export default function* typesSaga() {
    yield takeEvery(GET_TYPE_LIST, getTypes)
    yield takeEvery(GET_TYPE_DETAILS, getType)
    yield takeLatest(ADD_TYPE, addType)
    yield takeLatest(UPDATE_TYPE, updateType)
    yield takeEvery(DELETE_TYPE, deleteType)

}