import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Bounds} from "../../model/Bounds";
import {Club} from "../../model/Club";
import {MapResponse} from "../../model/MapResponse";

export function fetchMapResponse(bounds: Bounds, zoom = 1, club: Club | null): ThunkActionType<Promise<MapResponse>> {
    return (dispatch: ThunkDispatchType, getState, {mapRepository}): Promise<MapResponse> => {
        return mapRepository.getShapesForBounds(bounds, zoom, club);
    };
}
