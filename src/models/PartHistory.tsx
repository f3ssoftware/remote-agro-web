export class PartHistory {
    constructor(
        public id?: number,
        public createdAt?: string,
        public part_id?: number,
        public price?: string,
        public type?: string,
        public quantity?: number,
        public accountable?: string,
        public good_name?: string
    ) { }
}