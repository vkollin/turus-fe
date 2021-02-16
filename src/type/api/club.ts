export interface ClubResponse {
    id: number,
    name: string,
    icon: string | null,
}

export interface ClubSearchResponse extends Array<ClubResponse> {
}
