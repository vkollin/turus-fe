import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Club} from "../../model/Club";
import axios, {CancelTokenSource} from "axios";
import {MutableRefObject} from "react";
import {ResultsResponse} from "../../model/ResultsResponse";
import {Postcode} from "../../model/Postcode";

const cancelMessage = 'Request canceled due to new fetch request';

export function fetchResults(postcode: Postcode | null, club: Club | null, cancelTokenRef: MutableRefObject<CancelTokenSource | null>): ThunkActionType<Promise<ResultsResponse>> {
    const cancelTokenSource = axios.CancelToken.source();

    if (cancelTokenRef.current !== null) {
        cancelTokenRef.current.cancel(cancelMessage);
    }

    cancelTokenRef.current = cancelTokenSource

    return (dispatch: ThunkDispatchType, getState, {resultsRepository}): Promise<ResultsResponse> => {
        return resultsRepository.getResults(postcode, club, {cancelToken: cancelTokenSource.token});
    };
}
