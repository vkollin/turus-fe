export class Collection<T> {
    constructor(protected items: T[] = []) {
    }

    add(item: T): void {
        this.items.push(item);
    }

    getItems(): T[] {
        return this.items;
    }
}
