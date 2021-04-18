import {ShapeResponse} from "../type/api/map";
import {createClubFromClubResponse} from "./club";
import {Result} from "../model/Result";

export const createResultsFromResponse = (shapeResponse: ShapeResponse) => {
    const results = shapeResponse.results.map((r) => new Result(createClubFromClubResponse(r.club), r.count, r.total));

    results.sort((a, b) => {
        return b.count - a.count
    });

    return results;
};
