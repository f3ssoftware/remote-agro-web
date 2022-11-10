import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { BankAccount } from "../models/BankAccount";
import { BankAccountDTO } from "../models/dtos/BankAccountsDTO";
import { ExpensesInvoiceData } from "../models/ExpensesInvoiceData";
import { ExpensesRevenue } from "../models/ExpensesRevenue";
import { popLoading, pushLoading } from "./loading.store";
import { getMessages } from "./messaging.store";

const initialExpensesInvoiceData: ExpensesInvoiceData = {};
const initialBankAccounts: BankAccount[] = [];
const initialExpensesRevenue: ExpensesRevenue[] = [];
const financialStore = createSlice({
    name: "financial",
    initialState: {
        expensesInvoiceData: initialExpensesInvoiceData,
        bankAccounts: initialBankAccounts,
        expensesRevenue: initialExpensesRevenue
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
        }
    },
});

export const { setExpensesInvoiceData, setBankAccounts, setExpensesRevenue } =
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

export function asyncFetchExpensesAndRevenues(page: number, pageSize: number, fromDate: string, untilDate: string) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/expenses-and-revenues/?page=${page}&pageSize=${pageSize}&from_date=${fromDate}&until_date=${untilDate}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            dispatch(setExpensesRevenue(result.data.content));
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