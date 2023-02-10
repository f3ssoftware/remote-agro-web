export class ManualOutputWeighing {
    constructor(
        public cultivation_id?: number,
        public contract_id?: number,
        public silo_id?: number,
        public gross_weight?: number,
        public tare_weight?: number,
        public car_driver?: string,
        public net_weight?: number,
        public humidity?: number,
        public impurity?: number,
        public discount?: number,
        public final_weight?: number,
        public type?: string,
        public shipping_company?: string,
        public humidity_discount?: string,
        public total_discount?: string,
        public observations?: string,
        public mode?: string,
        public weighing_date?: string,
        public car_plate?: string
    ) { }
}