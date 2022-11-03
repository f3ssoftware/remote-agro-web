import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { ExpensesInvoiceData } from "../models/ExpensesInvoiceData";
import { popLoading, pushLoading } from "./loading.store";
import { getMessages } from "./messaging.store";

const initialExpensesInvoiceData: ExpensesInvoiceData = {};
const financialStore = createSlice({
    name: "financial",
    initialState: {
        expensesInvoiceData: initialExpensesInvoiceData
    },
    reducers: {
        setExpensesInvoiceData(state, action) {
            state.expensesInvoiceData = action.payload;
        }
    },
});

export const { setExpensesInvoiceData } =
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