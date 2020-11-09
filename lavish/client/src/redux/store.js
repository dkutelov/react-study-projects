import { createStore, applyMiddleware } from "redux"
import { persistStore } from "redux-persist"
import logger from "redux-logger"
import createSagaMiddleware from 'redux-saga'

import rootReducer from "./root-reducer"
// sagas
import rootSaga from './root-saga'


const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

if (process.env.NODE_ENV === "development") {
  middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

// Pass here individual sagas
sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export { persistor, store }
