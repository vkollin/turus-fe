import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {User, UserHashType} from "../../model/User";

export function fetchUser(hash: UserHashType): ThunkActionType<Promise<User>> {
    return (dispatch: ThunkDispatchType, getState, {userRepository}): Promise<User> => {
        return userRepository.getUser(hash);
    };
}
