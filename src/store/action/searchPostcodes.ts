import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Postcode} from "../../model/Postcode";
import {SearchOptions} from "../../repository/PostcodeRepository";
import axios, {CancelTokenSource} from "axios";
import {MutableRefObject} from "react";

const cancelMessage = 'Request canceled due to new fetch request';

export function searchPostcodes(value: string, cancelTokenRef: MutableRefObject<CancelTokenSource | null>, options?: SearchOptions): ThunkActionType<Promise<Postcode[]>> {
    const cancelTokenSource = axios.CancelToken.source();

    if (cancelTokenRef.current !== null) {
        cancelTokenRef.current.cancel(cancelMessage);
    }

    cancelTokenRef.current = cancelTokenSource

    return (dispatch: ThunkDispatchType, getState, {postcodeRepository}): Promise<Postcode[]> => {
        return postcodeRepository.search(value, options ?? {}, {cancelToken: cancelTokenSource.token});
    };
}
