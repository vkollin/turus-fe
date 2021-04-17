import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {Club} from "../../model/Club";
import {SearchOptions} from "../../repository/ClubRepository";


export function searchClubs(value: string, exclude: Club[] = [], options?: SearchOptions): ThunkActionType<Promise<Club[]>> {
    return (dispatch: ThunkDispatchType, getState, {clubRepository}): Promise<Club[]> => {
        return clubRepository.search(value, exclude, options);
    };
}
