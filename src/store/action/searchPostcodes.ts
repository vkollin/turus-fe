import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Postcode} from "../../model/Postcode";

export function searchPostcodes(value: string): ThunkActionType<Promise<Postcode[]>> {
    return (dispatch: ThunkDispatchType, getState, {postcodeRepository}): Promise<Postcode[]> => {
        return postcodeRepository.search(value);
    };
}
