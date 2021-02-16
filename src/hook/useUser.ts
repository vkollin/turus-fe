import {useEffect, useReducer} from "react";
import {useDispatch} from "react-redux";
import {fetchUser} from "../store/action/fetchUser";
import {User, UserHashType} from "../model/User";
import {ThunkDispatchType} from "../type/thunk";
import {Postcode} from "../model/Postcode";
import {Club} from "../model/Club";
import {updateUser} from "../store/action/updateUser";
import {usePrevious} from "./usePrevious";
import {persistHash} from "../store/user/actions";

type useUserReturnType = [
    boolean,
        User | null,
    (postcode: Postcode) => void,
    (clubs: Club[]) => void,
    (clubs: Club[]) => void
];


interface StateType {
    user: User,
    finishedLoading: boolean
}

interface NewUserStateInterface {
    hash: UserHashType,
    postcode: Postcode | null,
    clubs: Club[],
    enemies: Club[],
}

interface NewStateInterface extends NewUserStateInterface {
    finishedLoading: boolean
}

const init = (hash: UserHashType): StateType => ({user: new User(hash, null), finishedLoading: false});

const reducer = (oldState: StateType, input: Partial<NewStateInterface>): StateType => {
    const newState: Partial<StateType> = {};
    const newUser = initNewUserIfNecessary(oldState, input);

    if (newUser) {
        newState.user = newUser
    }

    if (typeof input.finishedLoading !== "undefined") {
        newState.finishedLoading = input.finishedLoading
    }

    return {
        ...oldState,
        ...newState
    };
};

export const useUser = (initialHash: string | null): useUserReturnType => {
    const [state, stateDispatch] = useReducer(reducer, init(initialHash));
    const dispatch = useDispatch<ThunkDispatchType>();
    const previousUser = usePrevious<User>(state.user);

    useEffect(() => {
        dispatch(fetchUser(initialHash))
            .then(u => {
                if (typeof u.hash === "string") {
                    dispatch(persistHash(u.hash));
                }

                stateDispatch({
                    hash: u.hash,
                    postcode: u.postcode,
                    clubs: u.clubs,
                    enemies: u.enemies,
                    finishedLoading: true
                })
            });
    }, [])

    useEffect(() => {
        // prevent POST first user GET request
        if (typeof previousUser !== 'undefined' && previousUser.hash !== null) {
            dispatch(updateUser(state.user))
                .then(u => {
                    stateDispatch({
                        hash: u.hash,
                        postcode: u.postcode,
                        clubs: u.clubs,
                        enemies: u.enemies,
                    })
                })
        }
    }, [state.user])

    const setPostcode = (postcode: Postcode): void => {
        stateDispatch({postcode: postcode})
    }

    const setClubs = (clubs: Club[]): void => {
        stateDispatch({clubs: clubs})
    }

    const setEnemies = (clubs: Club[]): void => {
        stateDispatch({enemies: clubs})
    }

    return [!state.finishedLoading, state.user, setPostcode, setClubs, setEnemies];
}

function initNewUserIfNecessary(oldState: StateType, input: Partial<NewStateInterface>): User | null {
    const oldUserState = oldState.user;

    const userAttributes: NewUserStateInterface = {
        ...{
            hash: oldUserState.hash,
            postcode: oldUserState.postcode,
            clubs: oldUserState.clubs,
            enemies: oldUserState.enemies,
        },
        ...input
    }

    const newUser = new User(userAttributes.hash, userAttributes.postcode, userAttributes.clubs, userAttributes.enemies);

    return oldUserState.identifier !== newUser.identifier ? newUser : null;
}
