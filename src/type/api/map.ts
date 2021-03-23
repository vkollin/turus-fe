export type GetDataResponse = {
    polygon: null | {
        rings: [number, number][][]
    },
    postcode: string,
    name: string,
};
