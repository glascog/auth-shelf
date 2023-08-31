import axios from "axios";
import {put, takeLatest} from 'redux-saga/effects';

// worker saga: will be fired on "FETCH_SHELF_ITEMS" actions

function* fetchShelfItems() {
    try {
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    };
    const response = yield axios.get('/api/shelf', config);
    yield put({ type: 'SET_SHELF_ITEMS', payload: response.data });
    } catch (error) {
        console.log('Shelf Items get request failed', error)
    }
}

function* shelfSaga() {
    yield takeLatest('FETCH_SHELF_ITEMS', fetchShelfItems);
}

export default shelfSaga;