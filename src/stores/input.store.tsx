import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";

const inputStore = createSlice({
    name: 'input',
    initialState: {
        inputs: [
            {
                "quantityInDecimal": 0,
                "id": 0,
                "quantity": 0,
                "measure_unit": "None",
                "total_price": 0,
                "treatment": null,
                "product": {
                    "name": "None",
                    "specifications": "None",
                    "class": "None"
                }
            },
        ],
        productHistory: [{ "id": 0, "flow_type": "None", "createdAt": new Date(), "accountable": "None", "quantity": 0, "observations": "None", "price": 0 }]
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
        const results = await axios.get('https://remoteapi.murilobotelho.com.br/products', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        dispatch(getInputs(results.data.productsListByUser));
    }
}

export function asyncFetchProductHistory(id: number) {
    return async function (dispatch: AppDispatch) {
        const result = await axios.get(`https://remoteapi.murilobotelho.com.br/product-flows-by-user-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        dispatch(getProductHistory(result.data));
    }
}