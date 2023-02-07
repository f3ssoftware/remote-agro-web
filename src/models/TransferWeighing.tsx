export class TransferWeighing {
    constructor(
        public cultivation_id?: number,
        public transfer_quantity?: number,
        public type?: string,
        public weighing_date?: string,
        public input_silo_id?: number,
        public output_silo_id?: number

    ) { }
}