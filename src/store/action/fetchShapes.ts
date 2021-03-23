import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Bounds} from "../../model/Bounds";
import {Shape} from "../../model/Shape";

export function fetchShapes(bounds: Bounds): ThunkActionType<Promise<Shape[]>> {
    return (dispatch: ThunkDispatchType, getState, {mapRepository}): Promise<Shape[]> => {
        return mapRepository.getShapesForBounds(bounds);
    };
}
