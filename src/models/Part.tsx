export class Part {
    constructor(
        public part_id?: number,
        public name?: string,
        public code?: number,
        public unit_price?: number,
        public quantity?: number,
        public position?: number,
        public accountable?: string,
        public observations?: string,
    ) { }
}