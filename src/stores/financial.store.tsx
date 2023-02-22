import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { startOfDecade, startOfSecond } from "date-fns";
import { AppDispatch } from "..";
import { BankAccount } from "../models/BankAccount";
import { Contract } from "../models/Contract";
import { Cultivation } from "../models/Cultivation";
import { BankAccountDTO } from "../models/dtos/BankAccountsDTO";
import { ExpenseInvoice } from "../models/ExpenseInvoice";
import { ExpensesInvoiceData } from "../models/ExpensesInvoiceData";
import { ExpensesRevenue } from "../models/ExpensesRevenue";
import { ExternalInvoice } from "../models/ExternalInvoice";
import { Planning } from "../models/Planning";
import { popLoading, pushLoading } from "./loading.store";
import { getMessages } from "./messaging.store";

const initialExpensesInvoiceData: ExpensesInvoiceData = {};
const initialBankAccounts: BankAccount[] = [];
const initialExpensesRevenue: ExpensesRevenue[] = [];
const initialOrderedPair: any[] = [];
const initialPlannings: Planning[] = [];
const initialCultivations: Cultivation[] = [];
const initialExternalInvoices: ExternalInvoice[] = [];
const initialContracts: Contract[] = []
const initialExpenseInvoiceEdit: ExpenseInvoice = {};

const financialStore = createSlice({
    name: "financial",
    initialState: {
        expensesInvoiceData: initialExpensesInvoiceData,
        bankAccounts: initialBankAccounts,
        expensesRevenue: initialExpensesRevenue,
        expenseInvoiceEdit: initialExpenseInvoiceEdit,
        chartOrderedPairs: initialOrderedPair,
        plannings: initialPlannings,
        cultivations: initialCultivations,
        externalInvoices: initialExternalInvoices,
        contracts: initialContracts,
        filterDates: {
            startDate: new Date().toLocaleDateString('pt-BR'),
            endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toLocaleDateString('pt-BR')
        },
        activeCard: 'total',
        type: '',
    },
    reducers: {
        setExpensesInvoiceData(state, action) {
            state.expensesInvoiceData = action.payload;
        },
        setBankAccounts(state, action) {
            state.bankAccounts = action.payload;
        },
        setExpensesRevenue(state, action) {
            state.expensesRevenue = action.payload;
        },
        setCashFlowChart(state, action) {
            state.chartOrderedPairs = action.payload;
        },
        setPlannings(state, action) {
            state.plannings = action.payload;
        },
        setCultivations(state, action) {
            state.cultivations = action.payload;
        },
        setExternalInvoices(state, action) {
            state.externalInvoices = action.payload;
        },
        setContracts(state, action) {
            state.contracts = action.payload
        },
        setFilterDates(state, action) {
            state.filterDates = action.payload;
        },
        setCardActive(state, action) {
            state.activeCard = action.payload;
        },
        setType(state, action) {
            state.type = action.payload
        },
        setExpenseInvoiceEdit(state, action) {
            state.expenseInvoiceEdit = action.payload
        }
    }
});

export const {
    setExpensesInvoiceData,
    setBankAccounts,
    setExpensesRevenue,
    setCashFlowChart,
    setPlannings,
    setCultivations,
    setExternalInvoices,
    setContracts,
    setFilterDates,
    setCardActive,
    setType,
    setExpenseInvoiceEdit } =
    financialStore.actions;
export default financialStore.reducer;

export function asyncFetchExpensesInvoicesData(fromDate: string, untilDate: string) {
    return async function (dispatch: AppDispatch) {
        try {
            // dispatch(pushLoading('expenses-invoice-data'));
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices-data?from_date=${fromDate}&until_date=${untilDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            // dispatch(popLoading('expenses-invoice-data'));
            dispatch(setExpensesInvoiceData(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.result.data.error,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFetchBankAccountsData() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/bank-accounts`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setBankAccounts(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.result.data.error,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFetchContractsData() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/contracts`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setContracts(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.result.data.error,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFetchExpensesAndRevenues(page: number, pageSize: number, fromDate: string, untilDate: string, paymentStatus?: string | null, type?: string | null) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/expenses-and-revenues/`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                params: {
                    page,
                    pageSize,
                    from_date: fromDate,
                    until_date: untilDate,
                    payment_status: paymentStatus,
                    type,
                }
            });
            dispatch(setExpensesRevenue(result.data.content));
            return 0;
        } catch (err) {
            console.log(err);
        }
    }
}

export function asyncCreateBankAccount(bankAccountDTO: BankAccountDTO) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/bank-accounts`, bankAccountDTO, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            dispatch(getMessages({
                message: "Conta cadastrada com sucesso",
                type: "success",
            }));
            dispatch(asyncFetchBankAccountsData());
        } catch (err) {
            console.log(err);
        }
    }
}

export function asyncFetchChart() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/cash-flows/graph`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            console.log('resultados: ', result.data);
            dispatch(setCashFlowChart(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: "Erro na requisição",
                    type: "error",
                })
            );
        }
    };
}

export function asyncPayExpense(id: number, bankAccountId: number, seasonId: number, amount: number, expensesRevenueId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices/${id}`,
                {
                    bank_account_id: bankAccountId,
                    was_paid: true,
                    season_id: seasonId,
                    amount,
                    expenses_and_revenue_id: expensesRevenueId
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth();
            // dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            dispatch(asyncFetchExpensesInvoicesData(new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(
                getMessages({
                    message: "Pagamento realizado com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: "Erro na requisição",
                    type: "error",
                })
            );
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth();
            // dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            // dispatch(asyncFetchExpensesInvoicesData(new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
        }
    };
}

export function asyncPayContract(id: number, bankAccountId: number, amount: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                {
                    bank_account_id: bankAccountId,
                    was_paid: true,
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth();
            dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            // dispatch(asyncFetchExpensesInvoicesData(new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(
                getMessages({
                    message: "Pagamento realizado com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: "Erro na requisição",
                    type: "error",
                })
            );
        }
    };
}

export function asyncConciliateExpense(id: number, seasonId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(
                `https://remoteapi.murilobotelho.com.br/expenses-and-revenues/${id}`,
                {
                    is_conciliated: true,
                    season_id: seasonId
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth();
            dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            dispatch(asyncFetchExpensesInvoicesData(new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(
                getMessages({
                    message: "Transação conciliada com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: "Erro na requisição",
                    type: "error",
                })
            );
        }
    };
}

export function asyncDeleteExpense(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth();
            dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            dispatch(asyncFetchExpensesInvoicesData(new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(
                getMessages({
                    message: "Conta excluída com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncManualRegisterExpense(expense: ExpenseInvoice) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices`,
                expense,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: "Despesa cadastrada com sucesso",
                    type: "success",
                })
            );
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth();
            dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            dispatch(asyncFetchExpensesInvoicesData(new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncRegisterContract(contract: Contract) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(
                `https://remoteapi.murilobotelho.com.br/contracts`,
                contract,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: contract.type === 'CONTRACT' ? "Contrato cadastrado com sucesso" : "Receita cadastrada com sucesso",
                    type: "success",
                })
            );
            return 0;
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFetchPlannings() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/plannings/?type=Custos%20Indiretos&`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setPlannings(result.data));
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFetchCultivations() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/cultivations`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setCultivations(result.data));
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFilterByButton(filter: string, startDate: string, endDate: string) {
    return async function (dispatch: AppDispatch) {
        let paymentStatus = null;
        let type = null;
        switch (filter) {
            case 'total': {
                paymentStatus = null;
            } break;
            case 'billings': {
                paymentStatus = 'unpaid'
                type = 'contract'
            } break;
            case 'payments': {
                paymentStatus = 'unpaid';
                type = 'expenses_invoices';
            } break;
            case 'paid': {
                paymentStatus = 'paid';
                type = 'expenses_invoices';
            } break;
            case 'due_dated': {
                paymentStatus = 'expired';
                type = 'expenses_invoice'
            } break;
            case 'received': {
                paymentStatus = 'paid'
                type = 'contract'
            }
        }
        await dispatch(asyncFetchExpensesAndRevenues(1, 300, startDate, endDate, paymentStatus, type));
    };
}

export function asyncFetchSefaz() {
    return async function (dispatch: AppDispatch) {
        try {
            dispatch(pushLoading({}))
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices-external`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setExternalInvoices(result.data));
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}


export function asyncLinkCertificate(data: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(
                `https://remoteapi.murilobotelho.com.br/entities`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: "Certificado vinculado com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncFetchExpenseInvoiceById(expense_invoice_id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            dispatch(pushLoading('expenses-invoices'));
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices/${expense_invoice_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(popLoading('expenses-invoices'));
            dispatch(setExpenseInvoiceEdit(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err?.result?.data?.error,
                    type: "error",
                })
            );
        }
    };
}