export class PlanningInput {
    constructor(
        public measure_unit?: string,
        public observations?: string,
        public payment_date?: string,
        public pms?: string,
        public product_id?: number,
        public quantity?: number,
        public seed_quantity_type?: string,
        public total_price?: number,
        public treatment?: any
    ) { }
}