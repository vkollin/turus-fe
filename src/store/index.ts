import {applyMiddleware, combineReducers, createStore} from 'redux'
import {thunkMiddleware} from "./middleware";
import {UserStore} from "./user/types";
import {userReducer} from "./user/reducers";

export type RootStore = { user: UserStore };

const rootReducers = combineReducers<RootStore>({user: userReducer});

const middleware = applyMiddleware(thunkMiddleware)

export const store = createStore(rootReducers, middleware)
