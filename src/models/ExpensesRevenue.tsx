import { Contract } from "./Contract";
import { ExpenseInvoice } from "./ExpenseInvoice";

export class ExpensesRevenue {
    constructor(
        public id?: number,
        public user_id?: number,
        public expenses_invoice_id?: number,
        public expenses_invoice?: ExpenseInvoice,
        public contract_id?: number,
        public contract?: Contract,
        public bank_account_id?: number,
        public amount?: string,
        public number?: string,
        public cost_type?: string,
        public is_concilliated?: boolean,
        public is_paid?: boolean,
        public observations?: string,
        public payment_date?: string,
        public deleted_at?: null,
        public reference?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public deletedAt?: string
    ) { }


}

