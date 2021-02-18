import {Repository} from "./Repository";
import {User} from "../model/User";
import {UpdateUserRequest, UserResponse} from "../type/api/user";
import {createUserFromUserResponse} from "../factory/user";

export class UserRepository extends Repository {

    getUser = async (hash: string | null): Promise<User> => {
        const url = `/api/user${hash ? `/${hash}` : ''}`;

        const response = await this.get<UserResponse>(url);

        return createUserFromUserResponse(response)
    }

    updateUser = async (user: User): Promise<User> => {
        const url = `/api/user`;

        if (user.hash === null) {
            throw new Error('The given user has no hash. only identifiable users are allowed to be passed to this method');
        }

        const response = await this.post<UpdateUserRequest, UserResponse>(url, null, {
            hash: user.hash,
            postcode: user.postcode?.code ?? null,
            clubs: user.clubs.map(c => c.id),
            enemies: user.enemies.map(c => c.id)
        });

        return createUserFromUserResponse(response);
    }
}
