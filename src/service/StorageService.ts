import Cookies from 'js-cookie'

export enum StorageIdentifier {
    USER_HASH = 'hash',
}

type ValueType = string | undefined;

export class StorageService {
    static set(identifier: StorageIdentifier, value: ValueType): void {
        if (typeof value !== "undefined") {
            Cookies.set(identifier, value, {expires: 3650})
        }
    }

    static get(identifier: StorageIdentifier): ValueType {
        return Cookies.get(identifier)
    }
}
