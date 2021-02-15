import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootStore} from "../store";
import {ExtraArguments} from "../store/middleware";
import {Action} from "redux";

export type ThunkDispatchType = ThunkDispatch<RootStore, ExtraArguments, Action<ThunkActionType> | Action<string>>;

export type ThunkActionType<ReturnType = Promise<unknown>> = ThunkAction<ReturnType, RootStore, ExtraArguments, Action<string>>;
