import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Club} from "../../model/Club";

export function searchClubs(value: string, exclude: Club[] = []): ThunkActionType<Promise<Club[]>> {
    return (dispatch: ThunkDispatchType, getState, {clubRepository}): Promise<Club[]> => {
        return clubRepository.search(value, exclude);
    };
}
