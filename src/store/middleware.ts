import thunk from "redux-thunk";

const apiUrl = document.body.dataset.apiurl;

const extraArguments = {};

export type ExtraArguments = {}

export const thunkMiddleware = thunk.withExtraArgument<ExtraArguments>(extraArguments);
