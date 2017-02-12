/**
 * redux-saga是一个redux中间件，具有以下特性
 *  集中处理redux副作用问题
 *  被实现为generator
 *  类redux-thunk中间件
 *  watch／worker 的工作形式
 * 
 */

/**
 * Effects
 *  Effect是一个javascript对象，对象里面包含描述副作用的信息，可以通过yield传达给sagaMiddleware执行
 *  在redux-saga世界里，所有的Effect都必须被yield才会执行，并且原则上来说，所有的
 *  yield后面只能跟Effect,以保证代码的易测性
 * 
 *  Effect 可看作为saga的任务但愿
 * 
*/

/**
 * put 作用和redux中的dispatch相同
 *      yield put ({ type: 'CLICK_BTN' });
 * select 作用和redux thunk中的getState相同
 *      const id = yield select(state => state.id);
 * take 等待redux dispatch匹配某个pattern的action
 *      while (true) {
 *          yield take('CLICK_BTN');
 *          yield fork(clickButtonSaga);
 *      }
 * fork 无阻塞调用子saga
 *      function *count（number）{
            let currNum = number;

            while(currNum >= 0) {
                console.log(currNum--);
                yield.delay(100);
            }
        }

        function *countSaga () {
            while(true) {
                const { payload: number } = yield take(BEGIN_COUNT);
                const countTaskId = yield fork(count, number);
                yield take(STOP_TASK);
                yield cancle(countTaskId);
            }
        }
 cancle 可以用来取消异步任务 fork
 * call 阻塞型调用 有阻塞地调用saga或者返回promise的函数
 *      const project = yield call(fetch, { url: //... });
 *      const members = yield call(fetchMembers, project.id);
 * 
 * race 竞赛
 *  自动取消那些失败的Effects
 *  import { race, take, put } from 'redux-saga/effects'

    function  *backgroundTask() {
        while(true) {
            //...
        }
    }

    function *watchStartBackgroundTask() {
        while(true) {
            yield take('START_BACKGROUND_TASK')
            yield race({
                task: call(backgroundTask),
                cancel: take('CANCEL_TASK')
            })
        }
    }
 */


/**
 * Redux Saga 辅助函数
 * 
 * takeEvery
 * takeLatest
 * 
 */

/**
 * 同步执行多个任务
 *  import { call } from 'redux-saga/effects'
 *  const [users, repos] = yield [
 *      call[fetch. '/users],
 *      call[fetch, '/repos]
 *  ]
 */

/**
 * 错误
 *  SagaCancellationException saga取消错误
 *      import { SagaCancellationException } from 'redux-saga'
        import { take, put, call, fork, cancel } from 'redux-saga/effects'
        import actions from 'somewhere'
        import { someApi, delay } from 'somewhere'

        function *bgSync() {
            try {
                while(true) {
                    // ...
                }
            } catch(error) {
                if(error instanceof SagaCancellationException) {
                    // ...
                }
            }
        }

        function *main() {
            while( yield take(START_BACKGROUND_SYNC) ) {
                // 启动后台任务
                const bgSyncTask = yield fork(bgSync)

                yield take(STOP_BACKGROUND_SYNC) 

                yield cancle(bgSyncTask)
            }
        }
 */

/**
 * 防抖动
 *  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    function *handleInput(input) {
        // 500ms 防抖动
        yield call(delay, 500)
        // ...
    }

    function *watchInput() {
        let task
        while(true) {
            const { input } = yield take('INPUT_CHANGED')
            if(task) {
                yield cancel(task)
            }
            task = yield fork(handleInput, input)
        }
    }
 */