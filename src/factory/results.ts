import {ShapeResponse} from "../type/api/map";
import {Results} from "../model/Results";
import {createResultsFromResponse} from "./result";

export const createFromResponse = (shapeResponse: ShapeResponse): Results => {
    const results = createResultsFromResponse(shapeResponse);

    return new Results(shapeResponse.postcode, shapeResponse.name, results);
}


