import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { popLoading, pushLoading } from "./loading.store";
import { History } from '../models/History';
import { Product } from "../models/Product";


const initialHistory: History[] = [];
const initialInputs: Product[] = [];
const inputStore = createSlice({
    name: 'input',
    initialState: {
        inputs: initialInputs,
        productHistory: initialHistory
    },
    reducers: {
        getInputs(state, action) {
            state.inputs = action.payload;
        },
        getProductHistory(state, action) {
            state.productHistory = action.payload;
        }
    }
});

export const { getInputs, getProductHistory } = inputStore.actions;
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