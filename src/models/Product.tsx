export class Product {
    constructor(
        public quantityInDecimal?: number,
        public id?: number,
        public measure_unit?: string,
        public total_price?: number,
        public treatment?: any,
        public product?: { name: string, specifications: string, class: string }
    ) { }
}