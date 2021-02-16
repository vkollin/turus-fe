import {Club} from "./Club";
import {Postcode} from "./Postcode";

export type UserHashType = string | null;

export class User {
    readonly hash: UserHashType = null;
    postcode: Postcode | null = null;
    clubs: Club[] = [];
    enemies: Club[] = [];

    constructor(
        hash: UserHashType,
        postcode: Postcode | null,
        clubs: Club[] = [],
        enemies: Club[] = [],
    ) {
        this.hash = hash;
        this.postcode = postcode;
        this.clubs = clubs;
        this.enemies = enemies;
    }

    get identifier(): string {
        const map = [this.hash, this.postcode?.code, this.clubs.map(c => c.id), this.enemies.map(c => c.id)];

        return JSON.stringify(map);
    }
}
