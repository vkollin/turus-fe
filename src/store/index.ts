import {applyMiddleware, combineReducers, createStore} from 'redux'
import {thunkMiddleware} from "./middleware";

export type RootStore = {};

const rootReducers = combineReducers<RootStore>({});

const middleware = applyMiddleware(thunkMiddleware)

export const store = createStore(rootReducers, middleware)
