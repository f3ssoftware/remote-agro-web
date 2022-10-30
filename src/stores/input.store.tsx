import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { popLoading, pushLoading } from "./loading.store";
import { History } from '../models/History';
import { Product } from "../models/Product";
import { Invoice } from "../models/Invoice";


const initialHistory: History[] = [];
const initialInputs: Product[] = [];
const initialInvoices: Invoice[] = [];
const inputStore = createSlice({
    name: 'input',
    initialState: {
        inputs: initialInputs,
        productHistory: initialHistory,
        invoices: initialInvoices,
    },
    reducers: {
        getInputs(state, action) {
            state.inputs = action.payload;
        },
        getProductHistory(state, action) {
            state.productHistory = action.payload;
        },
        getInvoices(state, action) {
            state.invoices = action.payload;
        }

    }
});

export const { getInputs, getProductHistory, getInvoices } = inputStore.actions;
export default inputStore.reducer;

export function asyncFetchInput() {
    return async function (dispatch: AppDispatch) {
        dispatch(pushLoading('products'));
        const results = await axios.get('https://remoteapi.murilobotelho.com.br/products', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(popLoading('products'));
        dispatch(getInputs(results.data.productsListByUser));
    }
}

export function asyncFetchProductHistory(id: number) {
    return async function (dispatch: AppDispatch) {
        dispatch(pushLoading('product-flows-by-user-product'));
        const result = await axios.get(`https://remoteapi.murilobotelho.com.br/product-flows-by-user-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(popLoading('product-flows-by-user-product'));
        dispatch(getProductHistory(result.data));
    }
}

export function asyncFetchInvoices() {
    return async function (dispatch: AppDispatch) {
        dispatch(pushLoading('expense-invoices'));
        const result = await axios.get(`https://remoteapi.murilobotelho.com.br/expenses-invoices`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(popLoading(`expense-invoices`));
        dispatch(getInvoices(result.data));

    }
}