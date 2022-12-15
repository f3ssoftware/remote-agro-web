export class PlanningInput {
    constructor(
        public measure_unit?: string,
        public observations?: string,
        public payment_date?: string,
        public pms?: null,
        public product_id?: string,
        public quantity?: number,
        public seed_quantity_type?: null,
        public total_price?: number,
        public treatment?: null
    ) { }
}