import {ThunkActionType, ThunkDispatchType} from "../../type/thunk";

export function fetchOpenApiDoc(): ThunkActionType<Promise<JSON>> {
    return (dispatch: ThunkDispatchType, getState, {documentationRepository}): Promise<JSON> => {
        return documentationRepository.fetchOpenApiSpecs();
    };
}
