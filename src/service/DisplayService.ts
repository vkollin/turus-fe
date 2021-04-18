export class DisplayService {
    static formatPercent = (number: number, fraction: number = 1): string => {
        return `${(number * 100).toFixed(fraction)}%`
    }
}
