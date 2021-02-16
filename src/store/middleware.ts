import thunk from "redux-thunk";
import axios from "axios";
import {apiUrl} from "./apiUrl";
import {UserRepository} from "../repository/UserRepository";
import {PostcodeRepository} from "../repository/PostcodeRepository";
import {ClubRepository} from "../repository/ClubRepository";
import {StorageService} from "../service/StorageService";

export type ExtraArguments = {
    userRepository: UserRepository
    postcodeRepository: PostcodeRepository
    clubRepository: ClubRepository,
    storageService: StorageService,
}

const extraArguments: ExtraArguments = {
    userRepository: new UserRepository(apiUrl, axios),
    postcodeRepository: new PostcodeRepository(apiUrl, axios),
    clubRepository: new ClubRepository(apiUrl, axios),

    storageService: new StorageService(),
};

export const thunkMiddleware = thunk.withExtraArgument<ExtraArguments>(extraArguments);
