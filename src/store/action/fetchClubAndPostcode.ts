import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import axios, {CancelTokenSource} from "axios";
import {MutableRefObject} from "react";
import {ClubAndPostcodeResponse} from "../../model/ResultsResponse";

const cancelMessage = 'Request canceled due to new fetch request';

export function fetchClubAndPostcode(club: string | null, postcode: string | null, cancelTokenRef: MutableRefObject<CancelTokenSource | null>): ThunkActionType<Promise<ClubAndPostcodeResponse>> {
    const cancelTokenSource = axios.CancelToken.source();

    if (cancelTokenRef.current !== null) {
        cancelTokenRef.current.cancel(cancelMessage);
    }

    cancelTokenRef.current = cancelTokenSource

    return (dispatch: ThunkDispatchType, getState, {resultsRepository}): Promise<ClubAndPostcodeResponse> => {
        return resultsRepository.getClubAndPostcode(postcode, club, {cancelToken: cancelTokenSource.token});
    };
}
