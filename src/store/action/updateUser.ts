import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";
import {User} from "../../model/User";

export function updateUser(user: User): ThunkActionType<Promise<User>> {
    return (dispatch: ThunkDispatchType, getState, {userRepository}): Promise<User> => {
        return userRepository.updateUser(user);
    };
}
