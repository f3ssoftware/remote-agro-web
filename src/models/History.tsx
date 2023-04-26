export class History {
    constructor(
        public id?: number,
        public flow_type?: string,
        public createdAt?: string,
        public accountable?: string,
        public quantity?: number,
        public observations?: string,
        public price?: number
    ) { }
}
