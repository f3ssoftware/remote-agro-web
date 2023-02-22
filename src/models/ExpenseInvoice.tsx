export class ExpenseInvoice {
    constructor(
        public id?: number,
        public year?: string,
        public reference?: string,
        public due_date?: string,
        public number?: string,
        public cost_type?: string,
        public cost_action?: string,
        public amount?: number,
        public installments?: any[],
        public payment_method?: string,
        public external_expenses_invoice_id?: number,
        public observations?: string,
    ) { }
}