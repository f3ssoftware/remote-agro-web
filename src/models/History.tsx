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

// { "id":14758, "flow_type":"TRATAMENTO ENTRADA", "createdAt":"2022-10-25T02:46:18.000Z", "accountable":"", "quantity":100, "observations":"obs", "price":0}