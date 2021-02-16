import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {StorageIdentifier, StorageService} from "../../service/StorageService";
import {DispatchActionType} from "./types";

export function persistHash(hash: string): ThunkActionType<void> {
    return (dispatch: ThunkDispatchType): void => {
        StorageService.set(StorageIdentifier.USER_HASH, hash)
        dispatch({
            type: DispatchActionType.PERSIST_HASH,
            hash: hash
        })
    };
}
