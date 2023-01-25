export class ExternalInvoice {
    constructor(
        public id?: number,
        public entity_id?: number,
        public entity?: {id: number, name: string},
        public expenses_invoice_id?: number,
        public external_id?: string,
        public issuer_name?: string,
        public issuer_document?: string,
        public recipient_document?: any,
        public nfe_key?: string,
        public total_value?: string,
        public issued_date?: string,
        public status?: string,
        public recipient_manifestation?: any,
        public is_nfe_complete?: string,
        public nfe_type?: string,
        public version?: string,
        public digest_value?: string,
        public correction_letter_number?: null,
        public cancellation_date?: null,
        public cancellation_reason?: null,
        public deleted_at?: null,
        public createdAt?: string,
        public updatedAt?: string,
        public deletedAt?: null
    ) { }

}