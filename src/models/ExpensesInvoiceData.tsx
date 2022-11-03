export class ExpensesInvoiceData {
    constructor(
        public contractsData?: number,
        public expensesInvoicesData?: number,
        public bankAccountsData?: number,
        public paidContractsData?: number,
        public unpaidContractsData?: number,
        public paidExpensesInvoicesData?: number,
        public unpaidExpensesInvoicesData?: number,
        public expiredExpensesInvoicesData?: number,
        public expiredContractsData?: number,
        public expiredExpensesInvoicesQuantity?: number,
        public expiredContractsQuantity?: number,
        public paidContractsQuantity?: number,
        public unpaidContractsQuantity?: number,
        public paidExpensesInvoicesQuantity?: number,
        public unpaidExpensesInvoicesQuantity?: number
    ) { }

}