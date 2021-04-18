import {Club} from "./Club";

export class Result {
    constructor(readonly club: Club, readonly count: number, readonly total: number | null) {
    }

    get share(): number | null {
        if (this.total === null) {
            return null;
        }

        return this.count / this.total;
    }
}
