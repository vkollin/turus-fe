import {Result} from "./Result";

export class Results {
    constructor(
        readonly postcode: string,
        readonly name: string | null,
        readonly results: Result[]
    ) {
    }
}
