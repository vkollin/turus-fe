import {Results} from "./Results";
import {Postcode} from "./Postcode";
import {Club} from "./Club";

export class ResultsResponse {
    constructor(readonly results: Results[]) {
    }
}

export class ClubAndPostcodeResponse {
    constructor(readonly club: Club | null, readonly postcode: Postcode | null) {
    }
}
