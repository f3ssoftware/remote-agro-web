export class TreatSeedsDTO {
    constructor(
        public user_products?: { id: number; }[],
        public user_seed_id?: number,
        public observations?: string,
        public accountable?: string,
        public user_seed_quantity?: number,
        public correct_decimals?: boolean,
    ) { }
}