import {UserHashType} from "../../model/User";

export enum DispatchActionType {
    PERSIST_HASH = "PERSIST_HASH"
}

export interface UserStore {
    hash: UserHashType,
}

interface LoginAction {
    type: typeof DispatchActionType.PERSIST_HASH,
    hash: string,
}

export type UserActionTypes = LoginAction
