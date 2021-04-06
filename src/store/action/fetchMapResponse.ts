import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Bounds} from "../../model/Bounds";
import {Club} from "../../model/Club";
import {MapResponse} from "../../model/MapResponse";
import axios, {CancelTokenSource} from "axios";
import {MutableRefObject} from "react";

const cancelMessage = 'Request canceled due to new fetch request';

export function fetchMapResponse(bounds: Bounds, zoom = 1, club: Club | null, cancelTokenRef: MutableRefObject<CancelTokenSource | null>): ThunkActionType<Promise<MapResponse>> {
    const cancelTokenSource = axios.CancelToken.source();

    if (cancelTokenRef.current !== null) {
        cancelTokenRef.current.cancel(cancelMessage);
    }

    cancelTokenRef.current = cancelTokenSource

    return (dispatch: ThunkDispatchType, getState, {mapRepository}): Promise<MapResponse> => {
        return mapRepository.getShapesForBounds(bounds, zoom, club, {cancelToken: cancelTokenSource.token});
    };
}
