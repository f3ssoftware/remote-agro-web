export class Part {
    constructor(
        public id?: number,
        public part_id?: string,
        public name?: string,
        public code?: number,
        public unit_price?: number,
        public quantity?: number,
        public position?: number,
        public accountable?: string,
        public observations?: string,
    ) { }
}