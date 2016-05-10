import test from 'tape'
import { call } from 'redux-saga/effects'
import { fetchData } from './sagas'
import * as Api from './Api'

const iterator = fetchData();

test('incrementAsync Saga test', (assert) => {
    // expects a call instruction
    assert.deepEqual(
        iterator.next().value,
        call(Api.request, 'http://jsonplaceholder.typicode.com/posts/1'),
        "fetchProducts should yield an Effect call(Api.fetch, './products')"
    );

    assert.end();
});