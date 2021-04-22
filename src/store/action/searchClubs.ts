import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Club} from "../../model/Club";
import {SearchOptions} from "../../repository/ClubRepository";
import axios, {CancelTokenSource} from "axios";
import {MutableRefObject} from "react";

const cancelMessage = 'Request canceled due to new fetch request';


export function searchClubs(value: string, exclude: Club[] = [], cancelTokenRef: MutableRefObject<CancelTokenSource | null>, options?: SearchOptions): ThunkActionType<Promise<Club[]>> {
    const cancelTokenSource = axios.CancelToken.source();

    if (cancelTokenRef.current !== null) {
        cancelTokenRef.current.cancel(cancelMessage);
    }

    cancelTokenRef.current = cancelTokenSource

    return (dispatch: ThunkDispatchType, getState, {clubRepository}): Promise<Club[]> => {
        return clubRepository.search(value, exclude, options ?? {}, {cancelToken: cancelTokenSource.token});
    };
}
