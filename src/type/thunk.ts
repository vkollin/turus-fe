import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootStore} from "../store";
import {ExtraArguments} from "../store/middleware";
import {Action} from "redux";


type ActionType = Action<ThunkActionType | string>;
export type ThunkDispatchType = ThunkDispatch<RootStore, ExtraArguments, ActionType>;
export type ThunkActionType<ReturnType = Promise<unknown>> = ThunkAction<ReturnType, RootStore, ExtraArguments, ActionType>;
