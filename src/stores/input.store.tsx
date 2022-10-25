import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";

const inputStore = createSlice({
    name: 'input',
    initialState: {
        inputs: [{}]
    },
    reducers: {
        getInputs(state, action) {
            state.inputs = action.payload;
        }
    }
});

export const { getInputs } = inputStore.actions;
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