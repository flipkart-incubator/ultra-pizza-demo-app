import { put, takeEvery } from "redux-saga/effects";
function* incrementPizza() {
    yield put({ type: 'INCREMENT', item:'Pizza' });
}

function* mySaga() {
    yield takeEvery("INCREMENT", incrementPizza);
}

export default mySaga;