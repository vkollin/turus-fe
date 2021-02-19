export const apiUrl = document.body.dataset.apiurl as string;

export function prefixWithApiUrl(suffix: string): string {
    return `${apiUrl}/${suffix}`;
}
