import { all } from 'redux-saga/effects';
import fieldSaga from './fieldSaga';

export default function * rootSaga() {
    yield all([
        fieldSaga()
    ])
}