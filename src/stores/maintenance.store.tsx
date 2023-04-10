import { createSlice } from "@reduxjs/toolkit";
import { Good } from '../models/Good'
import { AppDispatch } from "..";
import axios from "axios";

const initialGoods: Good[] = [];
const maintenanceStore = createSlice({
    name: "maintenance",
    initialState: {
        goods: initialGoods,
    },
    reducers: {
        setGoods(state, action) {
            state.goods = action.payload;
        }
    },
});

export const { setGoods } = maintenanceStore.actions;
export default maintenanceStore.reducer;

export function asyncFetchGoods() {
    return async function (dispatch: AppDispatch) {
        const results = await axios.get('https://remoteapi.murilobotelho.com.br/goods', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(setGoods(results.data))
    }
}