import {DispatchActionType, UserActionTypes, UserStore} from "./types";
import {StorageIdentifier, StorageService} from "../../service/StorageService";

const initialState: UserStore = {
    hash: StorageService.get(StorageIdentifier.USER_HASH) || null,
};

export function userReducer(state = initialState, action: UserActionTypes): UserStore {
    switch (action.type) {
        case DispatchActionType.PERSIST_HASH:
            return {...state, hash: action.hash};
        default:
            return state;
    }
}
