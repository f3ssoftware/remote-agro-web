import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { startOfDecade } from "date-fns";
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

const financialStore = createSlice({
    name: "financial",
    initialState: {
        expensesInvoiceData: initialExpensesInvoiceData,
        bankAccounts: initialBankAccounts,
        expensesRevenue: initialExpensesRevenue,
        chartOrderedPairs: initialOrderedPair,
        plannings: initialPlannings,
        cultivations: initialCultivations,
        externalInvoices: initialExternalInvoices,
        contracts: initialContracts

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
            console.log(action);
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
        filterByButton(state, action) {
            // const today = new Date()
            // const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            // dispatch(asyncFetchExpensesAndRevenues(1, 300, `${today.getDate()}/${today.getMonth() + 1}/${today.getUTCFullYear()}`, `${nextMonth.getDate()}/${nextMonth.getMonth() + 1}/${nextMonth.getUTCFullYear()}`));
            switch (action.payload) {
                case 'billings': {
                    state.expensesRevenue = state.expensesRevenue.filter(expense => {
                        if (expense.contract_id) {
                            return expense;
                        }
                    });
                } break;
                case 'payments': {
                    state.expensesRevenue = state.expensesRevenue.filter(exp => {
                        if (exp.expenses_invoice_id) {
                            return exp;
                        }
                    });
                } break;
                case 'due_dated': {
                    state.expensesRevenue = state.expensesRevenue.filter(exp => {
                        if (new Date(exp.payment_date!) < new Date() && !exp.is_paid && exp.expenses_invoice_id) {
                            return exp;
                        }
                    })
                }
            }
        }
    },
});

export const { setExpensesInvoiceData, setBankAccounts, setExpensesRevenue, setCashFlowChart, setPlannings, setCultivations, setExternalInvoices, setContracts, filterByButton } =
    financialStore.actions;
export default financialStore.reducer;

export function asyncFetchExpensesInvoicesData() {
    return async function (dispatch: AppDispatch) {
        try {
            // dispatch(pushLoading('expenses-invoice-data'));
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices-data`,
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

export function asyncFetchExpensesAndRevenues(page: number, pageSize: number, fromDate: string, untilDate: string) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/expenses-and-revenues/?page=${page}&pageSize=${pageSize}&from_date=${fromDate}&until_date=${untilDate}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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

export function asyncPayExpense(id: number, bankAccountId: number, seasonId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(
                `https://remoteapi.murilobotelho.com.br/expenses-invoices/${id}`,
                {
                    bank_account_id: bankAccountId,
                    was_paid: true,
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
            dispatch(asyncFetchExpensesInvoicesData());
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
            dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
            dispatch(asyncFetchBankAccountsData());
            dispatch(asyncFetchChart());
            dispatch(asyncFetchExpensesInvoicesData());
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
            dispatch(asyncFetchExpensesInvoicesData());
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
            dispatch(asyncFetchExpensesInvoicesData());
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
            dispatch(asyncFetchExpensesInvoicesData());
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
            dispatch(asyncFetchExpensesInvoicesData());
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

export function asyncFilterByButton(filter: string) {
    return async function (dispatch: AppDispatch) {
        const actualYear = new Date().getFullYear();
        const actualMonth = new Date().getMonth();
        await dispatch(asyncFetchExpensesAndRevenues(1, 300, new Date(actualYear, actualMonth, 0).toLocaleDateString('pt-BR'), new Date(actualYear, actualMonth + 1, 0).toLocaleDateString('pt-BR')));
        dispatch(filterByButton(filter))
    };
}

export function asyncFetchSefaz() {
    return async function (dispatch: AppDispatch) {
        try {
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